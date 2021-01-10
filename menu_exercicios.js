
function exibeSecao(pos){
    let arrExerciciosEl = document.querySelectorAll("section");

    for(let exercicioEl of arrExerciciosEl){
        exercicioEl.style.display = "none";
    }
    arrExerciciosEl[pos].style.display = "";
}

function criaMenu(){
    let navMenExercicios = document.querySelector("nav");
    
}