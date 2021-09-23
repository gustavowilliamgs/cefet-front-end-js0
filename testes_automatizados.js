
let numExecucaoExercicio = {};
let numExecucaoOKExercicio = {};
const icoAviso = "⚠️";
const icoOk = "✅";
const icoNotOk = "❌";
function testaExecucoes(numExercicio, strFuncao, arrParametros, arrObjValoresEsperados){
    let funcao = window[strFuncao];
    if(funcao == undefined){
        exibirAviso(numExercicio, "nao_implementado","nao-implementado");
        return false;
    }
    try{
        let bolOk = true;
        let bolOkParam = true;
        for(let i =0; i<arrParametros.length; i++){
            bolOkParam = testaExecucao(numExercicio, funcao, arrParametros[i], arrObjValoresEsperados[i]); 
            if(!bolOkParam){
                bolOk = false;
            }
        }

        exibirAviso(numExercicio, bolOk?"ok":"erro_execucao","conteudo");
        return bolOk;
    } catch (e) {
        exibirAviso(numExercicio, "erro_sitaxe","erro-sitaxe");
        throw e;
    }
}
function testaExecucao(numExercicio,  funcao, parametros, objValoresEsperados){
    let arrMsgErros = [];
    let arrChavesDiferentes = [];
    let strNumExercicio = (numExercicio+"").replaceAll(".","\\.");
    if(! (numExercicio in numExecucaoExercicio)){
        numExecucaoExercicio[numExercicio] = 1;
        numExecucaoOKExercicio[numExercicio] = 0;
    }else{
        numExecucaoExercicio[numExercicio]++;
    }
    exibirAviso(numExercicio, "conteudo");
    let numExecucao = numExecucaoExercicio[numExercicio];
    if(funcao.length != parametros.length){
        arrMsgErros.push("O número de parametros da função deveria ser ${parametros.length}");
        $(`#teste-ex${strNumExercicio}-conteudo`).html(`${icoAviso} O número de parametros da função deveria ser ${parametros.length}`)
        return false;
    }

    if(arrMsgErros.length > 0){
        return false;
    }
    let bolIsOk = false;

    limpaValoresExercicio(numExercicio);
    //executa funcao
    setSilentMode(true);
    let retorno = funcao.apply(null, parametros);
    setSilentMode(false);

    //verifica o teste
    let bolRetonoIgual = true;
    objValoresObtidos = obtemValorExercicio(numExercicio);
    
    if(retorno == undefined && "" in objValoresEsperados){
        arrMsgErros.push("A função deveria retornar algum valor.");
        bolIsOk = false;
    }else{
        if(retorno != undefined && !("" in objValoresEsperados)){
            arrMsgErros.push("A função não deveria retornar nada.");
            bolIsOk = false;
        }else{
            bolRetonoIgual = assertIsEqual( arrChavesDiferentes, "", objValoresEsperados[""], retorno);
            bolIsOk = bolRetonoIgual;
        }
    }
    let bolSaidaOk = true;
    for(let chaveEsperada in objValoresEsperados){
        if(chaveEsperada == ""){
            continue;
        }
        if(! (chaveEsperada in objValoresObtidos)){
            arrMsgErros.push(`Não foi possível encontrar o rotulo ${chaveEsperada}`);
        }else{
            bolSaidaOk = assertIsEqual( arrChavesDiferentes, chaveEsperada, 
                                    objValoresEsperados[chaveEsperada], objValoresObtidos[chaveEsperada]);
            if(!bolSaidaOk){
                bolIsOk = false;
            }
        }
    }
    imprimeResultadoTeste(numExercicio, numExecucao, parametros, arrMsgErros, arrChavesDiferentes, objValoresEsperados, objValoresObtidos, bolRetonoIgual, retorno);
    if(bolIsOk){
        numExecucaoOKExercicio[numExercicio] ++;
    }
    return bolIsOk;
}
function typeOf(valor){
    if(valor == undefined){
        return "undefined"
    }
    //verifica se é vetor (ou matriz) 
    if (Array.isArray(valor)) {
        if (valor.length>0) {
            //se for um vetor em q a primeira posicao é um vetor,
            //entao, considera-se uma matriz
            if (Array.isArray(valor[0])) {
                return 'matriz'
            }
        }
        
        return 'vetor';
    }
    return 'valor';
}
function assertIsEqual(arrChavesDiferentes, nomeRotulo, valorEsperado, valorObtido){
    let typeExpectedValue =typeOf(valorEsperado);
    let typeObtainedValue = typeOf(valorObtido);
    if(typeExpectedValue != typeObtainedValue){
        arrChavesDiferentes.push(nomeRotulo);
        return false;
    }

    //verifica se é igual dependendo do tipo
    let bolIsEqual = true;
    switch(typeExpectedValue){
        case "matriz":
            bolIsEqual = assertIsEqualMatrix(valorEsperado, valorObtido);
            break;
        case "vetor":
            bolIsEqual = assertIsEqualVector(valorEsperado, valorObtido);
            break;
        default:
            bolIsEqual = valorEsperado == valorObtido;
            break;
    } 
    if(!bolIsEqual){
        arrChavesDiferentes.push(nomeRotulo);
    }
    return bolIsEqual;

}

function assertIsEqualVector(valorEsperado, valorObtido){
    if(valorEsperado.length != valorObtido.length){
        return false;
    }
    for(let i=0 ; i<valorEsperado.length ; i++){
        if(valorEsperado[i] != valorObtido[i]){
            return false;
        }
    }
    return true;

}
function assertIsEqualMatrix(valorEsperado, valorObtido){
    if(valorEsperado.length != valorObtido.length){
        return false;
    }
    if(valorEsperado[0].length != valorObtido[0].length){
        return false;
    }
    for(let i=0 ; i<valorEsperado.length ; i++){
        for(let j=0; j<valorEsperado[i].length; j++){
            if(valorEsperado[i] != valorObtido[i]){
                return false;
            }
        }
    }
    return true;
}
function criaTitulo(numExercicio, strPrefixExecucao, strLabel, strClass, strPrefixId){
    let divElemento = document.createElement("div");
    let pElemento = document.createElement("p");
    divElemento.className = strClass;
    pElemento.innerHTML = strLabel;
    pElemento.className = strClass;
    divElemento.id = `${strPrefixId}${strPrefixExecucao}${numExercicio}`;
    divElemento.appendChild(pElemento);
    return divElemento;
}
function imprimeResultadoTeste(numExercicio, numExecucao, arrParametros, arrMsgErros, arrChavesDiferentes, objValoresEsperados, objValoresObtidos, bolRetornoIgual, retorno){
    let isOK = arrMsgErros.length == 0 && arrChavesDiferentes.length == 0 && bolRetornoIgual;
    let iconeExecucao = isOK?icoOk:icoNotOk;
    let strPrefixExecucao = `divTeste${numExecucao}Ex`;
    let divTesteExercicio = document.getElementById(`teste-ex${numExercicio}-conteudo`);
    //Escreve a seção de execução
    let divExecucaoEl = document.createElement("div");
    let tituloExecucaoEl = document.createElement("h3");
    tituloExecucaoEl.innerHTML = `Execucao #${numExecucao} ${iconeExecucao}`;
    divTesteExercicio.appendChild(tituloExecucaoEl);
    divTesteExercicio.appendChild(divExecucaoEl);

    //apresenta os avisos (caso exista)
    if(arrMsgErros.length >0){
        let divAvisosEl = criaTitulo(numExercicio, strPrefixExecucao, '', "aviso", "aviso")
        divAvisosEl.className = "avisoErro";
        divExecucaoEl.appendChild(divAvisosEl);
        let avisoEl = null;
        for(let erro of arrMsgErros){
            avisoEl = document.createElement("p");
            avisoEl.innerHTML = `⚠️ ${erro}`;
            divAvisosEl.appendChild(avisoEl);
        } 
    }
    //Parametros 
    let divParametros = criaTitulo(numExercicio, strPrefixExecucao, 'Parametros', "parametro", "param")
    divExecucaoEl.appendChild(divParametros);
    setContainerExPrefixo(`param${strPrefixExecucao}`);
    for(let i=0; i<arrParametros.length ; i++){
        escreva(numExercicio, `#${i}`, arrParametros[i]);
    }

   
    
    //saídas impressas na tela
    let divSaida = criaTitulo(numExercicio, strPrefixExecucao, "Saídas Impressas na Tela", 'saidaImpressa', 'saida');
    divExecucaoEl.appendChild(divSaida);
    setContainerExPrefixo(`saida${strPrefixExecucao}`);
    escrevaTabelaComparacao(numExercicio, divSaida, strPrefixExecucao+"saida", objValoresEsperados, objValoresObtidos, false);
    

    //retorno da função
    let divRetorno = criaTitulo(numExercicio, strPrefixExecucao, "Retorno da função", 'retorno', 'retorno');
    divExecucaoEl.appendChild(divRetorno);
    setContainerExPrefixo(`retorno${strPrefixExecucao}`);

    escreva(numExercicio, "Esperado", objValoresEsperados[""]);
    escreva(numExercicio, "Obtido", retorno);

    resetContainerExPrefixo();
}
function escrevaTabelaComparacao(numExercicio, divTesteEl, strPrefixExecucao,objValoresEsperados, objValoresObtidos){
    console.log(objValoresEsperados);
    console.log(objValoresObtidos);
    
    let tabelaEl = document.createElement("table");
    let linhaCabecalhoEl = document.createElement("tr");
    let col1CabecalhoEl = document.createElement("th");
    let col2CabecalhoEl = document.createElement("th");
    let linhaSaidaEl = document.createElement("tr");
    let tdEsperadoEl = document.createElement("td");
    let tdObtidoEl = document.createElement("td");
    let strPrefixSaidaEsperada = strPrefixExecucao+"Esp";
    let strPrefixSaidaObtida = strPrefixExecucao+"Obtida";

    //tabela
    divTesteEl.appendChild(tabelaEl);
    tabelaEl.className = "tabelaExecucaoTeste";
    //cabeçalho
    col1CabecalhoEl.innerHTML = "Esperado";
    col2CabecalhoEl.innerHTML = "Obtido";
    linhaCabecalhoEl.appendChild(col1CabecalhoEl);
    linhaCabecalhoEl.appendChild(col2CabecalhoEl);
    tabelaEl.appendChild(linhaCabecalhoEl);

    //linha - saida do teste
    tdEsperadoEl.id = strPrefixSaidaEsperada+numExercicio;
    tdObtidoEl.id = strPrefixSaidaObtida+numExercicio;
    linhaSaidaEl.appendChild(tdEsperadoEl);
    linhaSaidaEl.appendChild(tdObtidoEl);
    tabelaEl.appendChild(linhaSaidaEl);

    //escreve chaves (rotulo das saidas) tanto nos valores esperados quanto nos obtidos
    let arrRotulo = Object.keys(objValoresEsperados)
                    .filter(val => val!="").sort();
    setContainerExPrefixo(strPrefixSaidaEsperada);
    for(let rotulo of arrRotulo){
        escreva(numExercicio, rotulo, objValoresEsperados[rotulo]);
    }

    setContainerExPrefixo(strPrefixSaidaObtida); 
    arrRotulo = Object.keys(objValoresObtidos)
                    .filter(val => val!="").sort();
    for(let rotulo of arrRotulo){
        if(rotulo in objValoresObtidos){
            escreva(numExercicio, rotulo, objValoresObtidos[rotulo]);
        }
    }   
    divTesteEl.innerHTML += "<p class='observacao'>Todos os valores esperados devem ser iguais aos valores obtidos. Não há problemas haver rótulos a mais em valores obtidos.</p>";
}
let arr_avaliable_classes = ["ok",".erro_sitaxe","erro_execucao",
                            "nao_implementado","erro_sintaxe_outro"];
function exibirAviso(numExercicio, classeStatus, strSufixoAviso){
    let strNumExercicio = (numExercicio+"").replaceAll(".","\\.");
    $(`#teste-ex${strNumExercicio}>div`).addClass("escondido");
    $(`#teste-ex${strNumExercicio}-${strSufixoAviso}`).removeClass("escondido");
    
    //coloca cores nos avisos e no label
    for(let strAvStatusClass of arr_avaliable_classes){
        $(`#statusTeste${strNumExercicio}`).removeClass(strAvStatusClass);
        $(`#result-teste${strNumExercicio}`).removeClass(strAvStatusClass);
    }
    $(`#statusTeste${strNumExercicio}`).addClass(classeStatus);
    $(`#result-teste${strNumExercicio}`).addClass(classeStatus);

    let strNum = numExecucaoOKExercicio[numExercicio]+"/"+numExecucaoExercicio[numExercicio];
    $(`#result-teste${strNumExercicio}`).html(strNum);

}
function desenhaTestes(){
    let numExsPorUnid = [2, 6, 5];
    let numAquecimentoPorUnid = [3, 2, 2];

    let exercicioAtual = 1;
    let aquecimentoAtual = 1;

    let arrExs = [[],[],[]];
    for(let unidade=0; unidade<=numExsPorUnid.length; unidade++){
        let numExs = numExsPorUnid[unidade];
        let numAquecimentos = numAquecimentoPorUnid[unidade];

        let numExercicioAq,numExercicio;
        for(let aq=0; aq<numAquecimentos; aq++){
            numExercicioAq = (aquecimentoAtual+aq)/10;
            arrExs[unidade].push(numExercicioAq);
            
        }
        aquecimentoAtual = numExercicioAq*10+1;
        for(let ex=0; ex<numExs; ex++){
            numExercicio = (exercicioAtual+ex);
            arrExs[unidade].push(numExercicio);
        }
        exercicioAtual = numExercicio+1;
    }

    //desenha a tabela de testes
    let tabelaTestesEl = document.querySelector("#status_exercicios");
    let linhaCabecalhoEl = document.createElement("tr");
    let linhaStatusEl = document.createElement("tr");
    tabelaTestesEl.appendChild(linhaCabecalhoEl);
    tabelaTestesEl.appendChild(linhaStatusEl);

    for(let unidade=0; unidade<numExsPorUnid.length; unidade++){
        let celUnidade = document.createElement("th");
        celUnidade.innerHTML = "Unid. "+(unidade+1);
        celUnidade.colSpan = arrExs[unidade].length;
        linhaCabecalhoEl.appendChild(celUnidade);
        let celStatusEl;
        for(let numExercicio of arrExs[unidade]){
            celStatusEl = document.createElement("td");
            celStatusEl.dataset.mostraTeste = "teste-ex"+numExercicio;
            celStatusEl.innerHTML = numExercicio;
            celStatusEl.id = `statusTeste${numExercicio}`;
            celStatusEl.classList.add("erro_sintaxe_outro");
            linhaStatusEl.appendChild(celStatusEl);
        }
        celStatusEl.classList.add("lastStatusFromUnit");
    }

    //desenha apresentação do teste
    let saidaTestes = document.getElementById("saidaTestes");
    for(let unidade=0; unidade<numExsPorUnid.length; unidade++){
        for(let numExercicio of arrExs[unidade]){
            let containerEl = document.createElement("aside");
            //let tituloEl = document.createElement("h3");
            
            let divNaoImplementadoEl = document.createElement("div");
            let divErroSintaxeEl = document.createElement("div");
            let divSintaxeOutroEl = document.createElement("div");
            let divConteudoTesteEl = document.createElement("div");
            
            //tituloEl.innerHTML = `Exercício ${numExercicio}`;
            divNaoImplementadoEl.innerHTML = "A função deste exercício ainda não foi implementada. Caso tenha implementado, verifique se o nome dela está correto, conforme especificação (inclusive maiúsculas e minusculas).";
            divErroSintaxeEl.innerHTML = "Há um erro de sintaxe nesta função. Favor pressionar <kbd>F12</kbd> para depurá-lo. "
            divSintaxeOutroEl.innerHTML = "A função de algum exercício anterior está com erro de sintaxe.";

            containerEl.id = `teste-ex${numExercicio}`;
            containerEl.classList.add("saidaTeste");
            containerEl.title = `Execução do teste - Exercício ${numExercicio}`
            
            divNaoImplementadoEl.id = `teste-ex${numExercicio}-nao-implementado`;
            divNaoImplementadoEl.classList.add("aviso");
            divNaoImplementadoEl.classList.add("escondido");

            divErroSintaxeEl.id = `teste-ex${numExercicio}-erro-sitaxe`;
            divErroSintaxeEl.classList.add("aviso");
            divErroSintaxeEl.classList.add("escondido");

            divSintaxeOutroEl.id = `teste-ex${numExercicio}-erro-sitaxe-outro`;
            divSintaxeOutroEl.classList.add("aviso");

            divConteudoTesteEl.id = `teste-ex${numExercicio}-conteudo`;
            divConteudoTesteEl.classList.add("conteudo-teste");
            divConteudoTesteEl.classList.add("escondido");

            //containerEl.appendChild(tituloEl);
            containerEl.appendChild(divNaoImplementadoEl);
            containerEl.appendChild(divErroSintaxeEl);
            containerEl.appendChild(divSintaxeOutroEl);
            containerEl.appendChild(divConteudoTesteEl);
            saidaTestes.appendChild(containerEl);

            //acordions
            /*let strExercicio = (numExercicio+"").replaceAll(".","\\.")
            $( `#teste-ex${strExercicio}-conteudo` ).accordion({
                collapsible: true
            });
            */

        }

    }
    //modais e disparadores dos modais
    dialog = $( ".saidaTeste" ).dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        modal: true,
        open: function(e){
            let idDialog = (e.target.id+"-conteudo").replaceAll(".","\\.");
            $("#"+idDialog).accordion({
                collapsible: true,
                active: false,
            });
          }
    });

    
    //evento dos botoes de dialogos 
    let disparadores = [...document.querySelectorAll('[data-mostra-teste')];
    for(let botao of disparadores){
        botao.classList.add("erro_sintaxe_outro");
        botao.addEventListener("click", function(e){
            let curBotaoDisparador = e.currentTarget;
            let idDialogTestToOpen = curBotaoDisparador.dataset.mostraTeste.replaceAll(".","\\.");
            $( "#"+idDialogTestToOpen ).dialog( "open" );
        });
    }

}