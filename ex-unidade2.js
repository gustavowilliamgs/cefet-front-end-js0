function contandoElementosDoVetor(elementos, elementoSendoProcurado) {
    let quantidade = 0;
    for (let elemento of elementos) {
        if (elemento === elementoSendoProcurado) {
            quantidade++;
        }
    }
    
    return quantidade;
}

escreva(0.4, "O elemento sendo procurado apareceu ", contandoElementosDoVetor([1, 5, 5], 5) + " vezes");                   // retorna 2
escreva(0.4, "O elemento sendo procurado apareceu ", contandoElementosDoVetor(['daniel', 'flávio'], 'joão') + " vezes");   // retorna 0

function obtemNomeDoMes(numero) {
    if (numero < 1 || numero > 12) {
        escrevaMensagem(0.5, 'Mês inválido: ' + numero);
        return null;
    }
    
    let meses = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ];

    return meses[numero - 1];
}

escreva(0.5, "Teste 1", obtemNomeDoMes(4));
escreva(0.5, "Teste 2", obtemNomeDoMes(9));

function calculaVelocidadeAlturaBola (velocidadeInicial, gravidade, n) {
    for (let i = 1; i <= n; i++) {
        escreva(3, `h(${i})`, calculaAlturaBola(i, velocidadeInicial, gravidade));
        escreva(3, `v(${i})`, calculaVelocidadeBola(i, velocidadeInicial, gravidade));
    }
}

calculaVelocidadeAlturaBola(50, 9.81, 20);

function somatorio (n) {
    let s = 0;

    for (let i = 2; i <= n; i += 2) {
        s += 1 / i;
    }

    return s;
}

escreva(4, "Somatório", somatorio(1));
escreva(4, "Somatório", somatorio(10));
escreva(4, "Somatório", somatorio(100));


let frutas = ['Pera', 'Uva', 'Abacaxi', 'Cenoura']

function obtemPosicaoDoElemento (vetor, elemento) {
    let posicao = vetor.indexOf(elemento);
    return posicao != -1 ? posicao : null;
}

escreva(5, "Teste 1", obtemPosicaoDoElemento(frutas, 'Abacaxi'));


function calculaMediaEntreExtremos(vetor) {
    let max = vetor[0];
    let min = vetor[0];

    for (const elemento of vetor) {
        if (elemento > max) {
            max = elemento;
        } else if (elemento < min) {
            min = elemento;
        }
    }

    return (min + max) / 2;
}

escreva(6, "Teste 1", calculaMediaEntreExtremos([3, -2, 12]));

function fibonacci(tamanhoSequencia) {
    if (tamanhoSequencia <= 0) return [];
    if (tamanhoSequencia === 1) return [0];
    
    let sequencia = [0, 1];
    
    for (let i = 2; i < tamanhoSequencia; i++) {
        sequencia.push(sequencia[i - 2] + sequencia[i - 1]);
    }
    
    escreva(7, 'Fib(' + tamanhoSequencia + ')', sequencia);

    return sequencia;
}

fibonacci(7);

let pessoas = ["Alice", "Bob", "Carol", "Daniele"];

let amizades = [
    [0, 0, 0, 1],
    [1, 0, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 0, 0]
]

function exibeAmigos(pessoas, amizades, nome) {
  const posicaoNome = obtemPosicaoDoElemento(pessoas, nome);
  let amigos = [];

  for (let i = 0; i < pessoas.length; i++) {
    if (amizades[posicaoNome][i] === 1) {
      amigos.push(pessoas[i]);
    }
  }

  escreva(8, "Amigos de " + nome, amigos);
  
  return amigos;
}


function exibeAmigosEmComum(pessoas, amizades, nomeX, nomeY) {
    const amigosDeX = exibeAmigos(pessoas, amizades, nomeX);
    const amigosDeY = exibeAmigos(pessoas, amizades, nomeY);
    let amigosEmComum = [];

    for (let i = 0; i < amigosDeX.length; i++) {
       for (let j = 0; j < amigosDeY.length; j++) {
         if (amigosDeX[i] === amigosDeY[j]) {
             amigosEmComum.push(amigosDeX[i]);
         }
       }
    }

    escreva(8, "Amigos em comum ", amigosEmComum);
    
    return amigosEmComum;
}

escrevaMensagem(8, "Exibir amigos ");
exibeAmigos(pessoas, amizades, "Alice");
escrevaMensagem(8, "Exibir amigos em comum ");
exibeAmigosEmComum(pessoas, amizades, "Alice", "Carol");
