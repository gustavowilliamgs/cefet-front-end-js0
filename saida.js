let valor_obtido_por_exericio = {}
function obtemContainerExercicio(numero_exercicio){
    let str_id = "divEx"+numero_exercicio;
    let containerTesteEl = document.getElementById(str_id);
    return containerTesteEl;

}

function adicionaRotulo(containerEl, strRotuloVariavel){
    let labelEl =document.createElement("span");
    labelEl.className = "rotulo_variavel";
    labelEl.innerHTML = strRotuloVariavel;
    containerEl.appendChild(labelEl);
}
function adicionaValor(containerEl, valor){
    let labelEl =document.createElement("span");
    if(typeof(valor) == "string"){
        labelEl.className = "valor_variavel";
        labelEl.innerHTML = '"'+valor+'"';
    }else{
        labelEl.className = "valor_variavel";
        labelEl.innerHTML = valor;
    }
    containerEl.appendChild(labelEl);
}
function escreva(numExercicio, strRotuloVariavel, valorVariavel){

    //adiciona o valor obtido neste exercicio
    if(! (numExercicio in valor_obtido_por_exericio)){
        valor_obtido_por_exericio[numExercicio] = {}
    } 
    valor_obtido_por_exericio[numExercicio][strRotuloVariavel] = valorVariavel;

    //verifica se é vetor (ou matriz) para exibi-la apropriadamente
    if(Array.isArray(valorVariavel)){
        if(valorVariavel.length>0){
            //se for um vetor em q a primeira posicao é um vetor,
            //entao, considera-se uma matriz
            if(Array.isArray(valorVariavel[0])){
                escrevaMatriz(numExercicio, strRotuloVariavel, valorVariavel);
                return;
            }
        }
        escrevaVetor(numExercicio, strRotuloVariavel, valorVariavel);
        return;
    }

    //quando não é uma variavel composta: 
    //procura obtem o container
    let containerExercicioEl = obtemContainerExercicio(numExercicio);

    //adiciona um subcontainer com o rotulo desta veriavel
    adicionaRotulo(containerExercicioEl, strRotuloVariavel+":");    

    adicionaValor(containerExercicioEl,valorVariavel);
}

function escrevaMensagem(numExercicio, strMensagem){
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    let pMsg = document.createElement("p");
    pMsg.innerHTML = strMensagem;
    containerExercicioEl.appendChild(pMsg);

}

function escrevaVetor(numExercicio, strRotuloVariavel, valorVariavel){
    //procura obtem o container do teste
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    let divVariavelEl = document.createElement("div");
    divVariavelEl.className = "variavelComposta";
    containerExercicioEl.appendChild(divVariavelEl);

    //adiciona um subcontainer com o rotulo desta veriavel
    adicionaRotulo(divVariavelEl, strRotuloVariavel+":");  
    let tabelaEl = document.createElement("table");
    divVariavelEl.appendChild(tabelaEl);
    tabelaEl.className = "vetor";

    let linhaCabecalhoEl = document.createElement("tr");
    for(let i =0; i<valorVariavel.length; i++){
        let indiceIEl = document.createElement("td");
         indiceIEl.className = "indice";
         indiceIEl.innerHTML = i;
        linhaCabecalhoEl.appendChild(indiceIEl);
    }

    let linhaValoresEl = document.createElement("tr");
    for(let i =0; i<valorVariavel.length; i++){
        let valorIEl = document.createElement("td");
        valorIEl.className = "valorPosVetor";
        adicionaValor(valorIEl,valorVariavel[i]);
        linhaValoresEl.appendChild(valorIEl);
    }

    
    tabelaEl.appendChild(linhaCabecalhoEl);
    tabelaEl.appendChild(linhaValoresEl);
}

function escrevaMatriz(numExercicio, strRotuloVariavel, valorVariavel){
    //procura obtem o container do teste
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    let divVariavelEl = document.createElement("div");
    containerExercicioEl.appendChild(divVariavelEl);
    divVariavelEl.className = "variavelComposta";
    //adiciona um subcontainer com o rotulo desta veriavel
    adicionaRotulo(divVariavelEl, strRotuloVariavel+":");  
    let tabelaEl = document.createElement("table");
    tabelaEl.className = "matriz";
    let linhaCabecalhoEl = document.createElement("tr");
    linhaCabecalhoEl.appendChild(document.createElement("td"));
    let maxCol = 0;
    for(let i =0; i<valorVariavel.length; i++){
        if(valorVariavel[i].length>maxCol){
            maxCol = valorVariavel[i].length;
        }
    }

    //imprime os indices
    for(let i =0; i<maxCol; i++){
        let indiceIEl = document.createElement("td");
        indiceIEl.className = "indice";
        indiceIEl.innerHTML = i;
        linhaCabecalhoEl.appendChild(indiceIEl);
    }

    tabelaEl.appendChild(linhaCabecalhoEl);
    
    for(let i =0; i<valorVariavel.length; i++){
        let linhaValoresEl = document.createElement("tr");
        //indice da i-esima linha da matriz
        let indiceIEl = document.createElement("td");
        indiceIEl.className = "indice";
        indiceIEl.innerHTML = i;
        linhaValoresEl.appendChild(indiceIEl);

        //imprime a j-ésima linha da matriz da i-ésima colna
        for(let j=0; j<valorVariavel[i].length; j++){
            
            let valorIEl = document.createElement("td");
            valorIEl.className = "valorPosMatriz";
            adicionaValor(valorIEl,valorVariavel[i][j]);
            linhaValoresEl.appendChild(valorIEl);
        }
        tabelaEl.appendChild(linhaValoresEl);
    }
    divVariavelEl.appendChild(tabelaEl);
    

}