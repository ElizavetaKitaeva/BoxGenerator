'use strict'
import '../scss/styles.scss'

const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $result = document.querySelector('#result');
const $gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', true);
  isGameStarted = true;
  $start.classList.add('hide');

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100)

  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $start.classList.remove('hide');
  $game.innerHTML = '';
  $game.style.backgroundColor = 'rgba(204, 204, 204, 0.459)'
  $timeHeader.classList.add('hide');
  $resultHeader.classList.remove('hide');
  $gameTime.removeAttribute('disabled');
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = '';
  
  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let boxStyle = box.style;

  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  boxStyle.height = boxStyle.width = boxSize + 'px';
  boxStyle.position = 'absolute';
  boxStyle.backgroundColor = randomColor();
  boxStyle.border = '1px solid #ccc';
  boxStyle.top = getRandom(0, maxTop) + 'px';
  boxStyle.left = getRandom(0, maxLeft) + 'px';;
  boxStyle.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor() {
  let randomRgb = () => Math.floor(Math.random() * (256)).toString(16);
  let color = '#' + randomRgb() + randomRgb() + randomRgb();
  return color;
}