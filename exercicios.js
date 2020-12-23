function testeSaidas(){
    escrevaMensagem(0.1,"Exercício 0.1");
    let a = 1;
    let b = 2;
    let c = [1,3,2,123,2321,32,1];
    let d = [
        [12,21,21,1,2],
        [12,1,2,3,1,1],
        [1,1,2,3,1,4]
    ];
    let m = [
            [0,0,0,1],
            [1,0,1,1],
            [0,0,0,1],
            [1,1,0,0],
            ]
    let pessoas = ["Alice", "Bob", "Carol","Daniele"];
    let e = true;

    escreva(0.1,"Variável a",a);

}
function obtemMes(numMes){
    if(numMes<null || numMes>null){
        escrevaMensagem(0.4,"Mês inválido: "+numMes);
        return "";
    }
    let meses = ["janeiro","fevereiro","março","abril",
                "maio","junho","julho","agosto",
                "setembro","outubro","novembro","dezembro"];
        
    escreva(0.3,"Mes",meses[null]);
    return meses[null];
}
function entendendoParaCada(vetorElementos, elementoBusca){
    let quantidade = 0;
    for (let elemento of vetorElementos) {


    }

    return quantidade;

}

function alturaBola(tempo, velocidadeInicial, gravidade){
    let altura = null;


    escreva(1,"h("+tempo+")",null);

    return null;
}




function fibonacci(tamanhoSequencia){
    let arrSequencia = [0,1];

    


    escreva(8,"Fib("+tamanhoSequencia+")",arrSequencia);
    return arrSequencia;
}
function eliminaCaracteres(texto, caracteresParaEliminar){
    
    for (let caracterEliminar of caracteresParaEliminar) {
        

    }
    escreva(9,"texto final - eliminação de "+caracteresParaEliminar,texto);

    return texto;
}
function substituaCaracteres(texto, caracteresProcura, caracteresSubstituirPor){
    for(let i=0; i<caracteresProcura.length; i++){
        let caractereProcura = caracteresProcura[i];
        let caractereSubstituirPor = caracteresSubstituirPor[i];


    }
    escreva(9,"texto final (substituição de  "+caracteresProcura+" por "+caracteresSubstituirPor+")",texto);
    return texto;
}
function daOiPara(funcaoDeDarOi, strPessoa){

    //veja que aqui, independente do nome da função
    //externa, invocamos ela como funcao_de_dar_oi
    strOi = funcaoDeDarOi(strPessoa);

    escrevaMensagem(11,"============= Minha linda interface de dar oi =========");
    escrevaMensagem(11,strOi);
    escrevaMensagem(11,"========================");
}





function oiPortuguesFormal(strPessoa){
    return "Oi Sr(a). "+strPessoa+", como vai?";
}
let oiPortugues = function(strPessoa){
                        return "Oi "+strPessoa+", como vai?"
                }
daOiPara(oiPortuguesFormal,"Daniel");
daOiPara(oiPortugues,"Daniel");
daOiPara(function(strPessoa){
                    return "Hi "+strPessoa+", how are you?";
                    },"Daniel");
