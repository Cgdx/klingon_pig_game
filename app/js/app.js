/* Game Rules
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game*/


//GLOBAL SCOPE VARIABLES
var globalScore, currentScore, activePlayer, gamePlaying;

//GAME INIT
gameInit();


function gameInit() {
  globalScore = [0,0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

document.querySelector('.dice').style.display='none'; //hide dice per default
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');

};


//DICE ROLL


document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {


  $('.dice').removeClass('animated fadeOut');
  // add random number

  var dice = Math.floor(Math.random() * 6) + 1;

  // display the result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'img/dice-' + dice + '.png';
  // update current score if rolled number is not 1
  if (dice > 1) {
    //add currentScore
    currentScore += dice;
    document.getElementById('current-' + activePlayer).textContent = currentScore;
  }
    else {
//next player
nextPlayer();
  }
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    //store the current score to global globalScore and add it to global score
    globalScore[activePlayer] += currentScore;
    document.getElementById('score-' + activePlayer).textContent = globalScore[activePlayer];


    var finalScore = document.querySelector('.final-score').value;
    var winningScore;
    if (finalScore) {
      winningScore = finalScore;
    } else {
      winningScore = 100;
    }
    //check winning condition
    if (globalScore[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      $('.dice').removeClass('animated fadeOut');
      gamePlaying = false;
    }
    else {
      //switch players
      nextPlayer();
    }
  }

});

function nextPlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
  currentScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  $('.dice').addClass('animated fadeOut');

};

//new game INIT btn new
document.querySelector('.btn-new').addEventListener('click',gameInit);


// Particles JS
particlesJS("particles-js", {"particles":{"number":{"value":160,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},"repulse":{"distance":400,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
