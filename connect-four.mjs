import { Game } from './game.mjs';
let game = undefined;
const clickTargets = document.getElementById("click-targets");
function updateUi() {
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
            let square = document.getElementById(`square-${i}-${j}`);
            square.innerHTML = '';
            if (game.getTokenAt(i, j) === 1) {
                let token = document.createElement('div');
                token.classList.add('token', 'black');
                square.appendChild(token);
            }
            if (game.getTokenAt(i, j) === 2) {
                let token = document.createElement('div');
                token.classList.add('token', 'red');
                square.appendChild(token);
            }
        }
    }

    for (let i = 0; i <= 6; i++) {
        let column = document.getElementById(`column-${i}`);
        if (game.isColumnFull(i)) {
            column.classList.add('full');
        }
        else {
            column.classList.remove('full');
        }
    }

    const boardHolder = document.getElementById("board-holder");
    const gameName = document.getElementById('game-name');
    if (game === undefined) {
        boardHolder.classList.add('is-invisible');
    } else {
        boardHolder.classList.remove('is-invisible');
        gameName.innerHTML = game.getName();
        if (game.currentPlayer === 1) {
            clickTargets.classList.add("black");
            clickTargets.classList.remove("red");
        }
        if (game.currentPlayer === 2) {
            clickTargets.classList.add("red");
            clickTargets.classList.remove("black");
        }
    }
}

window.addEventListener("DOMContentLoaded", e => {
    const player1Name = document.getElementById("player-1-name");
    const player2Name = document.getElementById("player-2-name");
    const newGameButt = document.getElementById("new-game");

    function enableNewGame() {
        newGameButt.disabled = player1Name.value.length === 0 ||
            player2Name.value.length === 0
    }

    player1Name.addEventListener("keyup", e => {
        enableNewGame();
    })
    player2Name.addEventListener("keyup", e => {
        enableNewGame();
    })

    newGameButt.addEventListener('click', e => {
        game = new Game(player1Name.value, player2Name.value);
        player1Name.value = '';
        player2Name.value = '';
        enableNewGame();
        updateUi();

    })

    clickTargets.addEventListener('click', e => {
        let targID = event.target.id;
        if (!targID.startsWith('column-')) {
            return;
        }
        let colNum = Number.parseInt(targID[targID.length - 1])
        //console.log(game);
        game.playInColumn(colNum);
        updateUi();
    });
});
