let isPlayerOne = true;
let juegoActivo = true;
let cells = document.getElementsByClassName("cell");

for (let i = 0; i < cells.length; i++) { 
    cells[i].addEventListener('click', userMove); 
}

function userMove(e) {
    if (!juegoActivo) return;

    let cell = e.target;

    if (!cell.innerHTML.length) {
        const jugador = isPlayerOne ? 'X' : 'O';
        cell.innerHTML = jugador;

   
        cell.classList.remove('x', 'o');
        cell.classList.add(jugador.toLowerCase());

        isPlayerOne = !isPlayerOne;

        CheckLine(0, 1, 2);
        CheckLine(3, 4, 5);
        CheckLine(6, 7, 8);
        CheckLine(0, 3, 6);
        CheckLine(1, 4, 7);
        CheckLine(2, 5, 8);
        CheckLine(0, 4, 8);
        CheckLine(2, 4, 6);

        verificarEmpate();
    }
}



function CheckLine(c1, c2, c3) {
    if (
        cells[c1].innerHTML.length &&
        cells[c1].innerHTML === cells[c2].innerHTML &&
        cells[c2].innerHTML === cells[c3].innerHTML
    ) {
        showWinner(cells[c1].innerHTML);
    }
}

function verificarEmpate() {
    let todasLlenas = true;

    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].innerHTML.length) {
            todasLlenas = false;
            break;
        }
    }

    if (todasLlenas && juegoActivo) {
        document.querySelector('#resultados').innerHTML = "El gato gana";
        juegoActivo = false; 

}
}

function showWinner(player) {
    document.querySelector('#resultados').innerHTML = player + " win!";
    juegoActivo = false;
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add("bloqueada");
    }
}

document.getElementById('reiniciar').addEventListener('click', reiniciarJuego); 

function reiniciarJuego() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove("bloqueada", "x", "o");
    }

    isPlayerOne = true;
    juegoActivo = true;

    const resultados = document.querySelector('#resultados');
    resultados.innerHTML = "Empieza el jugador X!";
    resultados.classList.remove("oculto");

    setTimeout(() => {

        if (resultados.innerHTML.includes("Empieza")) {
            resultados.classList.add("oculto");
            setTimeout(() => {
                resultados.innerHTML = "";
                resultados.classList.remove("oculto");
            }, 500);
        }
    }, 2500);
}