function exibeExercicio(numUnidadeEnsino, numExercicio){
    let arrExerciciosEl = document.querySelectorAll("section");
    let arrMenuExerciciosEl = document.querySelectorAll("nav li");

    for(let i=0; i<arrExerciciosEl.length; i++){
        arrExerciciosEl[i].style.display = "none";



    }
    for(let i=0; i<arrMenuExerciciosEl.length; i++){
        if(arrMenuExerciciosEl[i].dataset.numExercicio == numExercicio && arrMenuExerciciosEl[i].dataset.numUnidadeEnsino == numUnidadeEnsino){
            arrMenuExerciciosEl[i].classList.add("selecionado");
        }else{
            arrMenuExerciciosEl[i].classList.remove("selecionado");
        }
    }
    arrExerciciosEl[numExercicio].style.display = "";


    
}
function exibeAquecimentoUnidadeEnsino(unidadeEnsino){
    let aquecimentoDivEl = null;
    for(let i =1 ; i<=3;  i++){
        aquecimentoDivEl = document.querySelector("#aquecimentoUnidade"+i);
        if(i != unidadeEnsino){
            aquecimentoDivEl.style.display = "none";
        }else{
            aquecimentoDivEl.style.display = "";
        }
    }
    
}
function clicouExercicio(event){
    let itemClicado = event.currentTarget;
    let numExercicio = itemClicado.dataset.numExercicio;
    let numUnidadeEnsino = itemClicado.dataset.numUnidadeEnsino;

    exibeExercicio(numUnidadeEnsino, numExercicio);
    if(itemClicado.dataset.numExercicio==0){
        exibeAquecimentoUnidadeEnsino(numUnidadeEnsino);
    }
    
    localStorage.setItem('ultimoExercicio', numExercicio);
    localStorage.setItem('ultimaUnidadeEnsino', numUnidadeEnsino);
}

function criaMenu(numUnidadeEnsino, arrNumExericios){
    //cria a menu
    let menuExerciciosEl = document.querySelector("#unidade"+numUnidadeEnsino+" nav ul");
    arrNumExericios.unshift(0);
    for(let numExercicio of arrNumExericios){
        let listMenuItens = document.createElement("li");
        if(numExercicio==0){
            listMenuItens.innerHTML = "Aquecimento";
            
        }else{
            listMenuItens.innerHTML = numExercicio;
        }
        listMenuItens.dataset.numExercicio = numExercicio;
        listMenuItens.dataset.numUnidadeEnsino = numUnidadeEnsino;
        listMenuItens.addEventListener("click", clicouExercicio);
        menuExerciciosEl.appendChild(listMenuItens);
    }
    

}
function exibeItemSelecionado(){
    //exibe o item previamente selecionado (se existir)
    let numExercicio = localStorage.getItem('ultimoExercicio');
    let numUnidadeEnsino = localStorage.getItem('ultimaUnidadeEnsino');
    if(numExercicio == null){
        numExercicio = 0;
        numUnidadeEnsino = 1;
    }
    exibeExercicio(numUnidadeEnsino, numExercicio);
    if(numExercicio == 0){
        exibeAquecimentoUnidadeEnsino(numUnidadeEnsino);
    }
}
criaMenu(1,[1,2]);
criaMenu(2,[4,5,6,7,8]);
criaMenu(3,[9,10,11,12,13]);
exibeItemSelecionado();