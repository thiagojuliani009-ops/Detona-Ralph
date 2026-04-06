
const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        restartButton: document.querySelector("#restart-game"),
        pauseButton: document.querySelector("#pause-game"),
    },
    values:{
        gameVelocity: 1000,
        hisPosition: 0,
        result:0,
        curretTime: 60,
        lives: 5,
        isPaused: false,
        isGameOver: false,
    },
    actions: {
      timerId: null,
      countDownTimerId: null,
    },
};
function playSound(audioName) {
    let audio = new Audio('./src/styles/audios/' + audioName + '.mp3');
    audio.volume = 0.3;
    audio.play(); 
} 

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime < 0) {
        gameOver("Tempo esgotado! O seu resultado foi: " + state.values.result);
    }
}

function gameOver(message) {
    state.values.isGameOver = true;
    state.values.isPaused = false;
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.pauseButton.textContent = "Pausar";
    alert(message);
}

function rendomSquare(){
    if (state.values.lives <= 0 || state.values.isPaused || state.values.isGameOver) {
        return;
    }
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let rendomNumber = Math.floor(Math.random() * 9);
    let rendomSquare = state.view.square[rendomNumber];
    rendomSquare.classList.add("enemy");
    state.values.hisPosition = rendomSquare.id;
}

function startTimers() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.actions.timerId = setInterval(rendomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function pauseGame() {
    if (state.values.isGameOver) {
        return;
    }

    if (state.values.isPaused) {
        state.values.isPaused = false;
        state.view.pauseButton.textContent = "Pausar";
        startTimers();
        return;
    }

    state.values.isPaused = true;
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.pauseButton.textContent = "Continuar";
}

function resetGame() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    state.values.result = 0;
    state.values.curretTime = 60;
    state.values.lives = 5;
    state.values.hisPosition = null;
    state.values.isPaused = false;
    state.values.isGameOver = false;

    state.view.score.textContent = "0";
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.lives.textContent = "x" + state.values.lives;
    state.view.pauseButton.textContent = "Pausar";
    state.view.square.forEach((square) => square.classList.remove("enemy"));

    startTimers();
}

function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown",() => {
            if (state.values.lives <= 0 || state.values.isPaused || state.values.isGameOver) {
                return;
            }

            if(square.id === state.values.hisPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hisPosition = null;
                playSound("handle");
            } else {
                state.values.lives--;
                state.view.lives.textContent = "x" + state.values.lives;

                if (state.values.lives <= 0) {
                    gameOver("Game Over! Você errou demais e perdeu todas as vidas. Resultado: " + state.values.result);
                }
            }
        });
    });
}

function addListenerRestart() {
    state.view.restartButton.addEventListener("click", resetGame);
}

function addListenerPause() {
    state.view.pauseButton.addEventListener("click", pauseGame);
}

function initialize() { 
    addListenerHitBox();
    addListenerRestart();
    addListenerPause();
    resetGame();
}

initialize();

    