import useState from '../state/useState';

const useGamePlay = function(accountId) {
	const { state, setState, gamePlayState } = useState();
	const {
		piggame,
		rolldiceBtn,
		cube,
		face_1,
		playerCurrent,
		holdBtn,
		playerScore,
		rivalScore,
		rivalCurrent,
		name
	} = this.domDidMount();

	console.log(this);

	// add click event on roll dice btn
	rolldiceBtn.onclick = function() {
		if (!gamePlayState.blockBtn) {
			rollDice();
			this.textContent = 'Wait...';
			holdBtn.textContent = 'Wait...';
		}
	};

	// add click event to holdBtn
	holdBtn.onclick = () => {
		if (!gamePlayState.blockBtn) {
			holdScore();
		}
	};

	const rollDice = (rollAgain) => {
		const rand = generateRandomNumber();
		const rand2 = generateRandomNumber();

		// console.log(`Dice: ${rand} Dice2: ${rand2}`);

		[ ...cube ].forEach((item, index) => {
			if (index === 0) {
				item.style.animationName = 'cube';
				setAnimationProperty(item);
				gamePlayState.diceResult = rand;
				[ ...face_1 ][0].textContent = rand;
			}
			if (index === 1) {
				setTimeout(() => {
					item.style.animationName = 'cube';
					setAnimationProperty(item);
					gamePlayState.diceResult = gamePlayState.diceResult + rand2;
					gamePlayState.current = gamePlayState.diceResult;
					[ ...face_1 ][1].textContent = rand2;
				}, 200);
			}

			setTimeout(() => {
				item.style.animationName = '';
			}, 5500);
		});

		//timeout for updateing textContent of current and player score
		setTimeout(() => {
			if (gamePlayState.active) {
				playerCurrent.textContent = +playerCurrent.textContent + gamePlayState.current;
				gamePlayState.current = playerCurrent.textContent;
			} else {
				rivalCurrent.textContent = +rivalCurrent.textContent + gamePlayState.current;
				gamePlayState.current = rivalCurrent.textContent;
			}

			if (gamePlayState.active) {
				if (rand === 1 && rand2 === 1) {
					return holdScore(true);
				}
				if (rand === 1 || rand2 === 1) {
					holdScore();
				}
			}

			gamePlayState.blockBtn = false;
			rolldiceBtn.textContent = 'Roll Dice!';
			holdBtn.textContent = 'Hold';
		}, 5500);

		// chack game play status for cpu roll
		if (!gamePlayState.active) {
			rolldiceBtn.textContent = 'Wait...';
			holdBtn.textContent = 'Wait...';
			// gamePlayState.blockBtn = true;
			setTimeout(() => {
				if (rollAgain > 3) {
					if (rand === 1 && rand2 === 1) {
						return holdScore(true);
					}
					if (rand === 1 || rand2 === 1) {
						holdScore();
					} else {
						rivalPlay();
					}
				} else {
					if (rand === 1 && rand2 === 1) {
						return holdScore(true);
					}

					holdScore();
				}
			}, 6000);
		} else {
			rolldiceBtn.textContent = 'Roll Dice!';
			holdBtn.textContent = 'Hold';
			gamePlayState.blockBtn = true;
		}
	};

	// hold score
	const holdScore = (reset) => {
		if (reset) {
			playerCurrent.textContent = 0;
			rivalCurrent.textContent = 0;
			gamePlayState.current = 0;
			gamePlayState.diceResult = 0;
		}

		if (gamePlayState.active) {
			playerScore.textContent = parseInt(playerScore.textContent) + parseInt(gamePlayState.current);
			gamePlayState.current = 0;
			playerCurrent.textContent = gamePlayState.current;
			gamePlayState.player = playerScore.textContent;
			switchAnimation();

			if (gamePlayState.player >= 100) {
				piggame.innerHTML += `<div class="gameFinish"><p class="animate">Player Win!</p></div>`;
				setTimeout(() => {
					resetDomToStarOfGame();
				}, 5000);
			}
		} else {
			rivalScore.textContent = parseInt(rivalScore.textContent) + parseInt(gamePlayState.current);
			gamePlayState.current = 0;
			rivalCurrent.textContent = gamePlayState.current;
			gamePlayState.rival = rivalScore.textContent;
			switchAnimation();

			if (gamePlayState.rival >= 100) {
				piggame.innerHTML += `<div class="gameFinish"><p class="animate">Rival Win!</p></div>`;
				setTimeout(() => {
					resetDomToStarOfGame();
				}, 5000);
			}
		}

		gamePlayState.active = !gamePlayState.active;
		if (!gamePlayState.active) {
			rivalPlay();
		} else {
			gamePlayState.blockBtn = false;
		}
	};

	// rival start play
	const rivalPlay = () => {
		gamePlayState.blockBtn = true;
		const rollAgain = Math.floor(Math.random() * 10);
		setTimeout(() => {
			rollDice(rollAgain);
		}, 1000);
	};

	// add or remove class name animate
	const switchAnimation = function() {
		[ ...name ][0].classList.toggle('animate');
		[ ...name ][1].classList.toggle('animate');
	};

	// generate random number for dice
	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 6) + 1;
	};

	// reset dom to start position
	const resetDomToStarOfGame = () => {
		this.createGameDom();
		this.render();
	};

	// css animation parametars
	const setAnimationProperty = (item) => {
		item.style.animationName = 'cube';

		item.style.setProperty('--rotateX-0', '90deg');
		item.style.setProperty('--rotateY-0', '360deg');
		item.style.setProperty('--rotateZ-0', '0deg');

		item.style.setProperty('--rotateX-35', '-180deg');
		item.style.setProperty('--rotateY-35', '-90deg');
		item.style.setProperty('--rotateZ-35', '0deg');

		item.style.setProperty('--rotateX-45', '-180deg');
		item.style.setProperty('--rotateY-45', '-90deg');
		item.style.setProperty('--rotateZ-45', '0deg');

		item.style.setProperty('--rotateX-65', '0deg');
		item.style.setProperty('--rotateY-65', '0deg');
		item.style.setProperty('--rotateZ-65', '-360deg');

		item.style.setProperty('--rotateX-75', '0deg');
		item.style.setProperty('--rotateY-75', '0deg');
		item.style.setProperty('--rotateZ-75', '-360deg');

		item.style.setProperty('--rotateX-100', '90deg');
		item.style.setProperty('--rotateY-100', '360deg');
		item.style.setProperty('--rotateZ-100', '0deg');
	};
};

export default useGamePlay;
