const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const timeEl = document.querySelector('#time')


startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', handlerClick)

function handlerClick(event) {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
}

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle();
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		setTime(current)
	}
}

function setTime(value) {
	let seconds = value < 10 ? `0${value}` : value
	timeEl.innerHTML = `00:${seconds}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	circle.classList.add('circle')
	const size = getRandomeNumber(10, 60)
	const { width, height } = board.getBoundingClientRect()
	const x = getRandomeNumber(0, width - size)
	const y = getRandomeNumber(0, height - size)
	const color = `rgba(${getRendomColor()}%, ${getRendomColor()}%, ${getRendomColor()}%, 1)`

	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${x}px`
	circle.style.left = `${y}px`
	circle.style.backgroundColor = color
	circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
  
  console.log(circle.style.backgroundColor);
	board.append(circle)
}

function getRandomeNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getRendomColor() {
	const index = Math.floor(Math.random() * 101)
	return index
}