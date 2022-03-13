//dice game script


// 1. player loses entire score if 2 sixes in a row

//2. input field for players to enter winning score

//3. add second dice to game so that player loses score if one of the dice is 1

var scores, roundScore, activePlayer, gamePlaying, previousRoll, goalScore;

init();

document.querySelector('.btn--roll').addEventListener('click', function() {
  if (gamePlaying) {
    //random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //update the round score if rolled number is not 1
    if ( dice === 6 && previousRoll === 6 ) {
      scores[activePlayer] = 0;
      document.getElementById('score--' + activePlayer).textContent = '0';
      previousRoll = 0;
      switchActivePlayer();
    } else if ( dice !== 1  ) {
        // add score
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      //next player
      switchActivePlayer();
    }
    previousRoll = dice;
  }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update ui
    document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

    //check if player won
    if ( scores[activePlayer] >= goalScore ) {
      document.getElementById('name--' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player--' + activePlayer).classList.add('player--winner');
      document.querySelector('.player--' + activePlayer).classList.remove('player--active');
      gamePlaying = false;
    } else {
      switchActivePlayer();
    }
  }

});

document.querySelector('.btn--score').addEventListener('click', function() {
    //getscore
    goalScore = document.querySelector('.input-score').value;

    if ( goalScore ) {
      document.querySelector('.btn--roll').style.display = 'block';
      document.querySelector('.btn--hold').style.display = 'block';
      document.querySelector('.btn--score').style.display = 'none';
    } else {
      alert('Please input the goal score.');
    }
});

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousRoll = 0;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.btn--roll').style.display = 'none';
  document.querySelector('.btn--hold').style.display = 'none';
  document.querySelector('.btn--score').style.display = 'flex';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.add('player--active');
}

function switchActivePlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  document.querySelector('.dice').style.display = 'none';
}
