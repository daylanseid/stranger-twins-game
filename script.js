
'use strict';
(function() {
  let timeLoss;
  let countDown;
  let flippedCards;
  let scoreIncrementer;


  const score = document.getElementsByClassName('score')[0];
  const timer = document.getElementsByClassName('timer')[0];
  const endGame = document.getElementsByClassName('game-over')[0];

  //deck
  function dealDeck() {
    const card = document.getElementsByClassName('card');
    const pics = ["url('images/waffle.jpg')", "url('images/barb.jpg')", "url('images/hat.jpg')", "url('images/lucas.jpg')", "url('images/will.jpg')", "url('images/hopper.jpg')", "url('images/mike.jpg')", "url('images/walkie.jpg')", "url('images/waffle.jpg')", "url('images/barb.jpg')", "url('images/hat.jpg')", "url('images/lucas.jpg')", "url('images/will.jpg')", "url('images/hopper.jpg')", "url('images/mike.jpg')", "url('images/walkie.jpg')"];

    timeLoss = 45;
    scoreIncrementer = 0;
    flippedCards = [];

    endGame.style.display = 'none';

    shuffle(pics);

    for (let i = 0; i < card.length; i += 1) {
      if(card[i].classList.contains('flipped')) {
        card[i].classList.toggle('flipped');
      }
      card[i].querySelector('.back').style.backgroundImage = pics[i];
      card[i].addEventListener('click', flip);
    }
    
    score.innerText = '00';

    startTimer();
  }
  //flip cards
  function flip() {
    if (!this.classList.contains('flipped') && flippedCards.length < 2) {
      this.classList.toggle('flipped');

      flippedCards.push(this);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }

  function checkMatch() {
    if (flippedCards[0].querySelector('.back').style.backgroundImage === flippedCards[1].querySelector('.back').style.backgroundImage) {
      flippedCards = [];

      score.innerText = '0' + ++scoreIncrementer;
    }
    else {
      setTimeout(flipBack, 1600);
    }
  }

  function flipBack() {
    flippedCards[0].classList.toggle('flipped');
    flippedCards[1].classList.toggle('flipped');

    flippedCards = [];
  }

  function startTimer() {
    timer.innerText = '0:45';
    countDown = setInterval(decrementTime, 1000);
  }

  function decrementTime() {
    if (timeLoss === 0) {
      timer.innerText = '0:0' + timeLoss;
      clearInterval(countDown);
      finalize();
    }
    if (timeLoss < 10) {
      timer.innerText = '0:0' + timeLoss;
    }
    if (timeLoss >= 10) {
      timer.innerText = '0:' + timeLoss;
    }
    if (scoreIncrementer === 8){
      clearInterval(countDown);
      finalize();
    }
    timeLoss--;
  }

  function finalize() {
    let restart = document.getElementsByTagName('button')[0];
    restart.addEventListener('click', dealDeck);

    endGame.style.display = 'flex';

    if (scoreIncrementer === 8) {
      endGame.querySelector('h1').innerText = 'YOU ESCAPED THE UPSIDE DOWN!';
    }
    else {
      endGame.querySelector('h1').innerText = 'YOU HAVE BEEN CAPTURED';
    }
    endGame.querySelector('.final-score').innerText = 'score: ' + scoreIncrementer;
    endGame.querySelector('.time').innerText = 'time left: ' + timeLoss + ' sec.';
  }
  
  //shuffle 
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  dealDeck();
})();