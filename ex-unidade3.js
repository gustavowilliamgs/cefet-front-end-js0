function metodosVetor(vetor) {
    vetor.sort();
    vetor.pop();
    vetor.unshift("abacate");

    escreva(0.6, "Vetor resultante", vetor);

    return vetor;
}

metodosVetor([4, 0, 9]);
metodosVetor([8, -1, "4", 2, "<3"]);

function metodosString(string) {
    string = string.replaceAll("o", "a");
    return string.toUpperCase();
}

function escreveDataPorExtenso(data) {
    data = data.split("/");

    let dia = data[0];
    let mes = obtemNomeDoMes(data[1]);
    let ano = data[2];

    let novaData = `${dia} de ${mes} de ${ano}`;

    escreva(9, "data", novaData);

    return novaData
}

escreveDataPorExtenso("06/11/2004");
escreveDataPorExtenso("10/10/2011");
escreveDataPorExtenso("31/05/2024");

function eliminaCaracteres(texto, caracteresParaEliminar) {
    for (let caractere of caracteresParaEliminar) {
        texto = texto.replaceAll(caractere, "");
    }

    return texto;
}


function substituiCaracteres(texto, caracteresProcura, caracteresSubstituirPor) {
    for(let i = 0; i < caracteresProcura.length; i++) {
        let caractereProcura = caracteresProcura[i];
        let caractereSubstituirPor = caracteresSubstituirPor[i];

        texto = texto.replaceAll(caractereProcura, caractereSubstituirPor);
    }

    return texto;
}

function inverteTexto(texto) {
    let textoInvertido = '';

    for (let i = texto.length - 1; i >= 0; i--) {
        textoInvertido += texto[i];
    }

    return textoInvertido;
}

function verificaPalindromo(texto) {
    texto = texto.toLowerCase();
    texto = eliminaCaracteres(texto, " ,.:;-+=-)(*&¨%$#@!?^~\\`{}[]|/\"\'");
    texto = substituiCaracteres(texto, "ãáâàêéêèîíìêèéôõòóûùç", "aaaaeeeeiiieeeoooouuuc");

    if (texto === inverteTexto(texto)) {
        return true;
    }

    return false;
}


function dizOiPara(funcaoDeDarOi, nomeDaPessoa) {

    // veja que aqui, independente do nome da função
    // externa, invocamos ela como funcaoDeDarOi
    textoDoOi = funcaoDeDarOi(nomeDaPessoa);

    escrevaMensagem(12, '=========== Início do chat ===========');
    escrevaMensagem(12, textoDoOi);
    escrevaMensagem(12, '======================================');
    escrevaMensagem(12, '<br>');
}


function oiEmPortuguesFormal(nome) {
    return 'Oi Sr(a). ' + nome + ', como vai?';
}

let oiEmPortugues = function(nome) {
    return 'Oi ' + nome + ', blza?';
};


// dá oi para 'Daniel' de várias formas diferentes
dizOiPara(oiEmPortuguesFormal, 'Daniel');
dizOiPara(oiEmPortugues, 'Daniel');
dizOiPara(function(nome) {
    return 'Hi ' + nome + ', how are you?';
}, 'Daniel');


function aplicaOperacaoEmCadaElemento(operacao, vetor1, vetor2) {
    let vetorSoma = [];

    if (vetor1.length !== vetor2.length) {
        return null;
    }

    for (let i = 0; i < vetor1.length; i++) {
        vetorSoma.push(operacao(vetor1[i], vetor2[i]));
    }

    return vetorSoma;
}

function subtrai(a, b) {
    return a - b;
}

const multiplica = function (a, b) {
    return a * b;
}

// A função soma já foi criada no arquivo ex-unidade1.js
escreva(13, "Soma", aplicaOperacaoEmCadaElemento(soma, [8], [4]));
escreva(13, "Subtracao", aplicaOperacaoEmCadaElemento(subtrai, [8], [4]));
escreva(13, "Multiplicação", aplicaOperacaoEmCadaElemento(multiplica, [8], [4]));