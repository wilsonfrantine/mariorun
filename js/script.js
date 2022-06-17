const mario = document.querySelector('.mario');
const pipe  = document.querySelector('.pipe');
const gameboard = document.querySelector('.game-board');
const bg = document.querySelector(".background"); 

var score = 0;
var worldSpeed = 1;
var gameBoardSize  = +window.getComputedStyle(gameboard).width.replace("px","");

var audio = document.getElementById("soundtrack");
var audioJump  = new Audio("./music/jump.mp3");
var audioDeath = new Audio("./music/death.mp3");
var audioCoin  = new Audio("./music/coin.mp3");

audio.play();

document.addEventListener('keydown', function(){
  jump(mario)
});

document.addEventListener('click', function(){
  jump(mario)
});


function updateSpeed(gameBoardSize, worldSpeed) {
  let base = score + 1;
  let newSpeed = (1000 + ( gameBoardSize * 1.4)  ) - (base/2);
  pipe.style.animation = `pipe-animation ${newSpeed}ms infinite linear`;
  
}

function jump(obj) {
  //obj.classList.add('jump')

  let base = score + 1;
  let jumpTime = 1000 - (base/5)
  obj.style.animation = `mario-jump ${jumpTime}ms ease-out`
  audioJump.play();

  setTimeout(() => {
    //obj.classList.remove('jump')
    obj.style.animation = 'none';
  }, `${jumpTime}`);
}
function restart() {

  const gameOverDiv    = document.getElementById('game_over');
  const gameOverButton = document.querySelector('.game-board');

  gameOverDiv.style.visibility = "visible";

  gameOverButton.onclick = function() {
    location.reload(true);
  }

}

function mariodeath(pipePosition, marioBottom, marioLeft, bgPosition){
    
    audio.pause();
    audioDeath.play();

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioBottom}px`;
    mario.style.left   = `${marioLeft}px`;
    mario.src = "./images/mariodead.png";

    bg.style.animation = 'none';
    bg.style.left      = `${bgPosition}px`;

    mario.classList.add('mario_dead');
    
    setTimeout(() => {
      mario.style.animation = 'mario-dead 2s';
      setTimeout(() => {
        mario.classList.add('mario_gone')
      }, 1995);
    }, 500);

}


updateSpeed(gameBoardSize, worldSpeed); 

const loop = setInterval(() => {
  
  var pipePosition = pipe.offsetLeft;
  var marioBottom  = +window.getComputedStyle(mario).bottom.replace('px','');
  var marioLeft    = +window.getComputedStyle(mario).left.replace('px','');
  var bgPosition   = +window.getComputedStyle(bg).left.replace('px','');

  let gbs = gameBoardSize;
  let ws  = worldSpeed;

  if(pipePosition < 122 && pipePosition > 0 && marioBottom < 80) {

    mariodeath(pipePosition, marioBottom, marioLeft, bgPosition);
    restart();

    clearInterval(loop);

  } else if (pipePosition < 122 && pipePosition > 0 && marioBottom > 80) {
    score = score+2;
    document.querySelector('.score').textContent = score;
    updateSpeed(gameBoardSize, worldSpeed)
  }

}, 10);
