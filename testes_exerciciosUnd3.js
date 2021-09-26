$( function() {
  exibirAviso(12, "nao_existe", "nao-existe");
  exibirAviso(13, "nao_existe", "nao-existe");
    
  console.log("oioi");
    let arrParametros;
    let arrObjValoresEsperados;

    //exercicio 0.6; nao testamos vetor vazio 
    arrParametros = [[[9,8,1,2,3,7]],
      [[9,8,-1,-2]],
      [[5,9,2]],
      [[10]]];
    arrObjValoresEsperados = [{"":["abacate",1,2,3,7,8]},
    {"":["abacate", -1, -2, 8]},
    {"":["abacate", 2, 5]},
    {"":["abacate"]}
    ];
    testaExecucoes(0.6, "metodosVetor", arrParametros, arrObjValoresEsperados, true);

    //exercicio 0.7
    arrParametros = [["hakuno mototo!"],
      ["oi!!"]
    ];
    arrObjValoresEsperados = [
          {"":"HAKUNA MATATA!"},
          {"":"AI!!"}
    ];
    testaExecucoes(0.7, "metodosString", arrParametros, arrObjValoresEsperados, true);

    //exercicio 9 
    arrParametros = [["12/10/2011"],
                      ["1/08/199"],
                      ["1/8/1999"],
                     ["10/1/2111"]];
    arrObjValoresEsperados = [{"":"12 de outubro de 2011"},
                    {"":'1 de agosto de 199'},
                    {"":'1 de agosto de 1999'},
                    {"":'10 de janeiro de 2111'}
                    ];
    testaExecucoes(9, "converteData", arrParametros, arrObjValoresEsperados, true);
    

    //exercicio 10 
    arrParametros = [
                    ['sapo', 'a'],
                    ['1/8/1999', '/'],
                    ['sapo', 'ao'],
                    ['2t24e223n23h22am2 3213u232m3 2332b323o23m32 32d322i12a1', '1234'],
                    ['correndo contra o tempo', 'coe'],
                    ];
    
  arrObjValoresEsperados = [{"":"spo"},
                    {"":'181999'},
                    {"":'sp'},
                    {"":'tenham um bom dia'},
                    {"":'rrnd ntra  tmp'}
                    ];
    testaExecucoes(10, "eliminaCaracteres", arrParametros, arrObjValoresEsperados, true);

    arrParametros = [
      ['sapo', 'a','o'],
      ['1/8/1999', '/','-'],
      ['sapo', 'ao','ui'],
      ['carambola hora bolas', ' o','-a'],
      ['o sapo nao lava o pe', 'aoe', 'iiu'],
      ];
    arrObjValoresEsperados = [{"":"sopo"},
                      {"":'1-8-1999'},
                      {"":'supi'},
                      {"":'carambala-hara-balas'},
                      {"":'i sipi nii livi i pu'}
                      ];
    testaExecucoes(10, "substituaCaracteres", arrParametros, arrObjValoresEsperados, true);
  
    arrParametros = [
      ["asa"],
      ["casa"],
      ["rapar"],
      ["Isso não é um palindromo"],
      ["A cara rajada da jararaca"],
      ["Socorram-me, subi no ônibus em Marrócós"],
      ];
    arrObjValoresEsperados = [{"":true},
                      {"":false},
                      {"":true},
                      {"":false},
                      {"":true},
                      {"":true},
                      ];
    testaExecucoes(11, "verificaPalindromo", arrParametros, arrObjValoresEsperados, true);
  } );
  