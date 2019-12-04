import useState from '../state/useState';

const useGamePlay = function(accountId) {
	const { state } = useState();
	const { rolldiceBtn, cube, face_1 } = this.domDidMount();

	rolldiceBtn.onclick = () => {
		rollDice();
	};

	const rollDice = () => {
		[ ...cube ].forEach((item, index) => {
			if (index === 0) {
				item.style.animationName = 'cube';
				setAnimationProperty(item);
				[ ...face_1 ][0].textContent = generateRandomNumber();
			}
			if (index === 1) {
				setTimeout(() => {
					item.style.animationName = 'cube';
					setAnimationProperty(item);
					[ ...face_1 ][1].textContent = generateRandomNumber();
				}, 200);
			}

			setTimeout(() => {
				item.style.animationName = '';
			}, 5500);
		});
	};

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 6) + 1;
	};

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
