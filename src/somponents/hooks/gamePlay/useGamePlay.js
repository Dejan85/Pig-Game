import useState from '../state/useState';

const useGamePlay = function(accountId) {
	const { state, setState, gamePlayState } = useState();
	const {
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

	rolldiceBtn.onclick = function() {
		if (!gamePlayState.blockBtn) {
			rollDice();
			this.textContent = 'Wait...';
			holdBtn.textContent = 'Wait...';
			gamePlayState.blockBtn = true;
		}
	};

	holdBtn.onclick = () => {
		if (!gamePlayState.blockBtn) {
			holdScore();
		}
	};

	const rollDice = (rollAgain) => {
		[ ...cube ].forEach((item, index) => {
			if (index === 0) {
				item.style.animationName = 'cube';
				setAnimationProperty(item);
				const rand = generateRandomNumber();
				gamePlayState.diceResult = rand;
				[ ...face_1 ][0].textContent = rand;
			}
			if (index === 1) {
				setTimeout(() => {
					item.style.animationName = 'cube';
					setAnimationProperty(item);
					const rand = generateRandomNumber();
					gamePlayState.diceResult = gamePlayState.diceResult + rand;
					gamePlayState.current = gamePlayState.diceResult;
					[ ...face_1 ][1].textContent = rand;
				}, 200);
			}

			setTimeout(() => {
				item.style.animationName = '';
			}, 5500);
		});

		setTimeout(() => {
			if (gamePlayState.active) {
				playerCurrent.textContent = +playerCurrent.textContent + gamePlayState.current;
				gamePlayState.current = playerCurrent.textContent;
			} else {
				rivalCurrent.textContent = +rivalCurrent.textContent + gamePlayState.current;
				gamePlayState.current = rivalCurrent.textContent;
			}
			rolldiceBtn.textContent = 'Roll Dice!';
			holdBtn.textContent = 'Hold';
			gamePlayState.blockBtn = false;
		}, 5500);

		if (!gamePlayState.active) {
			rolldiceBtn.textContent = 'Wait...';
			holdBtn.textContent = 'Wait...';
			gamePlayState.blockBtn = true;
			setTimeout(() => {
				if (rollAgain > 3) {
					rivalPlay();
				} else {
					holdScore();
				}
			}, 6000);
		} else {
			rolldiceBtn.textContent = 'Roll Dice!';
			holdBtn.textContent = 'Hold';
			gamePlayState.blockBtn = false;
		}
	};

	const holdScore = () => {
		if (gamePlayState.active) {
			playerScore.textContent = parseInt(playerScore.textContent) + parseInt(gamePlayState.current);
			gamePlayState.current = 0;
			playerCurrent.textContent = gamePlayState.current;
			switchAnimation();
		} else {
			rivalScore.textContent = parseInt(rivalScore.textContent) + parseInt(gamePlayState.current);
			gamePlayState.current = 0;
			rivalCurrent.textContent = gamePlayState.current;
			switchAnimation();
		}

		gamePlayState.active = !gamePlayState.active;

		if (!gamePlayState.active) {
			rivalPlay();
		}
	};

	const rivalPlay = () => {
		const rollAgain = Math.floor(Math.random() * 10);
		setTimeout(() => {
			rollDice(rollAgain);
		}, 1000);
	};

	const switchAnimation = function() {
		[ ...name ][0].classList.toggle('animate');
		[ ...name ][1].classList.toggle('animate');
	};

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 6) + 1;
	};

	// const resetBtnTextContent = function() {
	// 	rolldiceBtn.textContent = 'Roll Dice!';
	// 	holdBtn.textContent = 'Hold';
	// 	gamePlayState.blockBtn = !gamePlayState.blockBtn;
	// };

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
