const sky = document.querySelector('[data-sky-container]');
const bird = document.querySelector('[data-game-bird]');
const gamescreen = document.querySelector('[data-game-container]');
const score = document.querySelector('[data-score]');

let gravity = 2;
let birdBottom = 300;
let birdLeft = 100;
bird.style.left = birdLeft + 'px';
let obstacleGap = 110;
let minObstacleHeight = 200;
let isGameOver = false;

let gameScore = 0;

const startGame = () => {
	if (isGameOver) {
		clearInterval(gameInterval);
		document.removeEventListener('keyup', control);
		document.removeEventListener('click', jump);
		return;
	}
	birdBottom -= gravity;
	if (birdBottom <= 0) {
		console.log('game over');
		isGameOver = true;
	}
	bird.style.bottom = birdBottom + 'px';
};

const gameInterval = setInterval(startGame, 20);

const control = (e) => {
	if (e.keyCode === 32) {
		jump();
	}
};

const jump = () => {
	if (birdBottom <= sky.clientHeight - 65) {
		birdBottom += 25;
	}

	bird.style.bottom = birdBottom + 'px';
};

document.addEventListener('keyup', control);
document.addEventListener('click', jump);

const generateObstacle = () => {
	let obstacleLeft = sky.offsetWidth;
	let rand = Math.random() * 150;
	let currentObstacleHeight;

	const obstacle = document.createElement('div');
	const topObstacle = document.createElement('div');

	obstacle.classList.add('game__obstacle');
	topObstacle.classList.add('game__top__obstacle');

	obstacle.style.bottom = 0;
	topObstacle.style.top = 0;

	topObstacle.style.left = sky.offsetWidth + 'px';
	obstacle.style.left = sky.offsetWidth + 'px';

	obstacle.style.height =
		(rand % 2 === 0 ? minObstacleHeight - rand : minObstacleHeight + rand) +
		'px';

	sky.appendChild(obstacle);

	topObstacle.style.height =
		sky.offsetHeight - (obstacle.offsetHeight + obstacleGap) + 'px';

	sky.appendChild(topObstacle);

	const obstacleInterval = setInterval(() => {
		obstacleLeft -= gravity;
		console.log(obstacle.offsetHeight);
		if (
			(birdBottom <= obstacle.offsetHeight && birdLeft + 50 >= obstacleLeft) ||
			(birdBottom >= obstacle.offsetHeight + obstacleGap - 50 &&
				birdLeft + 50 >= obstacleLeft)
		) {
			isGameOver = true;
			console.log('game over');
		}
		if (isGameOver) {
			clearInterval(obstacleInterval);
			return;
		}

		if (obstacleLeft <= -75) {
			sky.removeChild(obstacle);
			sky.removeChild(topObstacle);
			clearInterval(obstacleInterval);
		}
		topObstacle.style.left = obstacleLeft + 'px';
		obstacle.style.left = obstacleLeft + 'px';
		score.textContent = gameScore;
	}, 20);
};

generateObstacle();

const generateObstacleInterval = setInterval(() => {
	if (isGameOver) {
		clearInterval(generateObstacleInterval);
		return;
	}
	generateObstacle();
}, 3000);
