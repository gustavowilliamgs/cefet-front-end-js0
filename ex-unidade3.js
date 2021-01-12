function eliminaCaracteres(texto, caracteresParaEliminar) {
    for (let caracterEliminar of caracteresParaEliminar) {
        
        
    }
    
    escreva(10, "texto final - eliminação de " + caracteresParaEliminar, texto);
    
    return texto;
}

function substituaCaracteres(texto, caracteresProcura, caracteresSubstituirPor) {
    for(let i = 0; i < caracteresProcura.length; i++) {
        let caractereProcura = caracteresProcura[i];
        let caractereSubstituirPor = caracteresSubstituirPor[i];
        
        
    }
    
    escreva(10,"texto final (substituição de  " + caracteresProcura + " por " + caracteresSubstituirPor + ")", texto);
    
    return texto;
}

function daOiPara(funcaoDeDarOi, strPessoa) {
    
    //veja que aqui, independente do nome da função
    //externa, invocamos ela como funcaoDeDarOi
    strOi = funcaoDeDarOi(strPessoa);
    
    escrevaMensagem(12, "============= Minha linda interface de dar oi =========");
    escrevaMensagem(12, strOi);
    escrevaMensagem(12, "========================");
}



function oiPortuguesFormal(strPessoa) {
    return "Oi Sr(a). " + strPessoa + ", como vai?";
}

let oiPortugues = function(strPessoa) {
    return "Oi " + strPessoa + ", blza?"
};

daOiPara(oiPortuguesFormal,"Daniel");
daOiPara(oiPortugues,"Daniel");
daOiPara(function(strPessoa) {
    return "Hi " + strPessoa + ", how are you?";
},"Daniel");
