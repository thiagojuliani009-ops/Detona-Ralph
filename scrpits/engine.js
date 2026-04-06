
const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        gameVelocity: 1000,
        hisPosition: 0,
        result:0,
        curretTime: 60, 
    },
    actions: {
      timerId: setInterval(rendomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
};
function playSound(audioName) {
    let audio = new Audio('./src/audios/' + audioName + '.mp3');
    audio.volume = 0.3;
    audio.play(); 
} 

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime < 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi:" + state.values.result);
    }
}


function rendomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let rendomNumber = Math.floor(Math.random() * 9);
    let rendomSquare = state.view.square[rendomNumber];
    rendomSquare.classList.add("enemy");
    state.values.hisPosition = rendomSquare.id;
}  



function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown",() => {
           if(square.id === state.values.hisPosition) {
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hisPosition = null; 
            playSound("handle");
           }

        });
    }); 
           
}

function initialize() { 
      addListenerHitBox();
}

initialize();

    