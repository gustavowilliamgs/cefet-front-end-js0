$( function() {

    desenhaTestes();
    
    let arrParametros;
    let arrObjValoresEsperados;

    //Exercicio 0.2
    arrParametros = [[2,3],[-1,0],[-1,-4]];
    arrObjValoresEsperados = [{"":5,"soma":5},
                                {"":-1,"soma":-1},
                                {"":-5,"soma":-5},
                                ];
    testaExecucoes(0.2, "soma", arrParametros, arrObjValoresEsperados);


    //Exercicio 0.3
    arrParametros = [[4],[9],[0]];
    arrObjValoresEsperados = [{"quadrado":16,"metade":2,"raiz":2},
                                {"quadrado":81,"metade":4.5,"raiz":3},
                                {"quadrado":0,"metade":0,"raiz":0},
                                ];
    testaExecucoes(0.3, "calculos", arrParametros, arrObjValoresEsperados);

    //Exercicio 1
    arrParametros = [[2, 4, 10],[2, 0, 5],[3, 20, 4]];
    arrObjValoresEsperados = [{"h(2)":-12, "":-12},
                                {"h(2)":-10, "":-10},
                                {"h(3)":42, "":42},
                                ];
    testaExecucoes(1, "alturaBola", arrParametros, arrObjValoresEsperados);

    //Exercicio 2
    arrParametros = [[4, 2, 10],[0, 2, 5],[20, 3, 4]];
    arrObjValoresEsperados = [{"h(2)":-12, "":-12},
                                {"h(2)":-10, "":-10},
                                {"h(3)":42, "":42},
                                ];
    testaExecucoes(2, "velocidadeBola", arrParametros, arrObjValoresEsperados);
    
  } );