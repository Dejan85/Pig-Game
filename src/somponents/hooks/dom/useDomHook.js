import { gamePlayHtml, createGameHtml } from './useHtmlAsString';
import useState from '../state/useState';
import { isNumber } from 'util';
import useGamePlay from '../gamePlay/useGamePlay';

const useDomHook = function() {
	const { state, setState, removeByIdFromState, accountId, setAccountId, editState } = useState();

	function Dom(piggame) {
		this.piggame = piggame;
	}

	// loaed game play html to dom
	Dom.prototype.gamePlayDom = function() {
		this.piggame.style.padding = '0 5rem';
		this.piggame.innerHTML = gamePlayHtml;
		this.timer();
	};

	// load create game html to dom
	Dom.prototype.createGameDom = function() {
		this.piggame.innerHTML = createGameHtml;
		this.render();
	};

	// select elemtn after element load to html
	Dom.prototype.domDidMount = function() {
		return {
			// create game
			piggameCreate: document.querySelector('.piggame__create'),
			betsBtns: document.querySelector('.piggame__create--betsChoices'),
			betsDecrease: document.querySelector('#betsDecrease'),
			betsIncrease: document.querySelector('#betsIncrease'),
			selectAccountBtn: document.querySelector('#selectAccountBtn'),
			addAccountBtn: document.querySelector('#addAccountBtn'),
			input__value: document.querySelector('#input__value'),
			accountList: document.querySelector('#accountList'),
			totalBudgetList: document.querySelector('#totalBudgetList'),
			// historyList: document.querySelector('#historyList'),

			// game play
			piggame: document.querySelector('.piggame'),
			rolldiceBtn: document.querySelector('.piggame__btns--rolldice'),
			holdBtn: document.querySelector('.piggame__btns--hold'),
			playerScore: document.querySelector('#playerScore'),
			playerCurrent: document.querySelector('#playerCurrent'),
			rivalScore: document.querySelector('#rivalScore'),
			rivalCurrent: document.querySelector('#rivalCurrent'),
			cube: document.querySelectorAll('.piggame__dice--cube'),
			face_1: document.querySelectorAll('.face_1'),
			name: document.querySelectorAll('.piggame__score--name'),
			minutFirstDecimal: document.querySelector('#minutFirstDecimal'),
			minutLastDecimal: document.querySelector('#minutLastDecimal'),
			secondFirstDecimal: document.querySelector('#secondFirstDecimal'),
			secondLastDecimal: document.querySelector('#secondLastDecimal')
		};
	};

	// create new account
	Dom.prototype.createAccount = function() {
		const { piggameCreate } = this.domDidMount();

		// const historyHtml = `<div class="piggame__history--date"><p>27. 11. 2019.</p><p>300</p><p>0</p></div>`;
		const createAccInput = `<div class="createAccInput"><div class="createAccInput__input"><input autofocus id="input" placeholder="Enter Name"></div></div>`;
		piggameCreate.innerHTML += createAccInput;

		document.querySelector('#input').onkeypress = (e) => {
			if (e.keyCode === 13 || e.charCode === 13) {
				const input = document.querySelector('.createAccInput');
				setState({
					playgame: false,
					input: 100,
					bets: 0,
					name: e.target.value,
					money: 1000
					// history: []
				});
				input.parentNode.removeChild(input);
				this.render();
			}
		};
	};

	// load acc from local storage
	Dom.prototype.render = function() {
		const { accountList, totalBudgetList } = this.domDidMount();
		const { state } = useState();

		// reset dom to not get duplicate
		accountList.innerHTML = '';
		totalBudgetList.innerHTML = '';
		// historyList.innerHTML = '';

		console.log(state);

		state &&
			state.forEach((item, index) => {
				accountList.innerHTML += `<p><i class="far fa-user"></i><span>${item.name}</span><i id="deleteBtn" data-key=${index} class="far fa-trash-alt"></i>`;
				totalBudgetList.innerHTML += `<div class="piggame__amount--money"><p>$</p><p>${item.money}</p></div>`;
				// historyList.innerHTML += `<div class="piggame__history--date"></div>`;
				// [ ...document.querySelectorAll('.piggame__history--date') ].forEach((item) => {
				// 	// console.log(item);
				// });
			});

		// delete account
		this.deleteAccount();
		this.btnTextContent();
		this.selectAccount();
		this.setBets();
	};

	// delece account method
	Dom.prototype.deleteAccount = function() {
		[ ...document.querySelectorAll('#deleteBtn') ].forEach((item) => {
			item.onclick = function(e) {
				e.stopPropagation();
				removeByIdFromState(parseInt(this.getAttribute('data-key')));
				dom.render();
				dom.btnTextContent();
			};
		});
	};

	// select account method
	Dom.prototype.selectAccount = function() {
		const { accountList } = this.domDidMount();
		[ ...accountList.children ].forEach((item, index) => {
			item.onclick = () => {
				[ ...accountList.children ].forEach((item2) => (item2.style.background = '#43587f'));
				item.style.background = '#556FA0';

				state[index].playgame = true;
				setAccountId(index);

				this.btnTextContent(index);
				this.startGame();
			};
		});
	};

	// this method change text on button
	Dom.prototype.btnTextContent = function(id) {
		const { selectAccountBtn } = this.domDidMount();

		if (isNumber(id) && state[id].playgame) {
			selectAccountBtn.textContent = 'Play Game';
		} else {
			selectAccountBtn.textContent = 'Select Account';
		}
	};

	// set bets on start game
	Dom.prototype.setBets = function() {
		const { betsDecrease, betsIncrease, input__value, betsBtns } = this.domDidMount();

		betsDecrease.onclick = () => {
			editState(accountId.id, 'input', --input__value.value);
		};

		betsIncrease.onclick = () => {
			editState(accountId.id, 'input', ++input__value.value);
		};

		[ ...betsBtns.children ].forEach((item) => {
			item.onclick = function() {
				const amount = this.getAttribute('data-amount');

				if (amount === '1/3') {
					editState(accountId.id, 'input', Math.floor(state[accountId.id].money / 3));
					input__value.value = Math.floor(state[accountId.id].money / 3);
				}

				if (amount === '1/2') {
					editState(accountId.id, 'input', Math.floor(state[accountId.id].money / 2));
					input__value.value = Math.floor(state[accountId.id].money / 2);
				}

				if (amount === 'min') {
					editState(accountId.id, 'input', 50);
					input__value.value = 50;
				}

				if (amount === 'max') {
					editState(accountId.id, 'input', state[accountId.id].money);
					input__value.value = state[accountId.id].money;
				}
			};
		});

		input__value.onkeypress = (e) => {
			if (e.keyCode === 13 || e.charCode === 13) {
				editState(accountId.id, 'input', +input__value.value);
			}
		};
	};

	Dom.prototype.timer = function() {
		const { minutFirstDecimal, minutLastDecimal, secondFirstDecimal, secondLastDecimal } = this.domDidMount();
		let sec = 0;
		let secondFirstDecimalNum = 0;
		let min = 0;
		let minFirstDecimalNum = 0;

		setInterval(() => {
			secondLastDecimal.textContent = ++sec;

			if (sec === 10) {
				secondLastDecimal.textContent = 0;
				secondFirstDecimal.textContent = ++secondFirstDecimalNum;
				sec = 0;
			}

			if (secondFirstDecimalNum === 6) {
				minutLastDecimal.textContent = ++min;
				sec = 0;
				secondFirstDecimalNum = 0;
				secondLastDecimal.textContent = 0;
				secondFirstDecimal.textContent = 0;
			}

			if (min === 10) {
				minutFirstDecimal.textContent = ++minFirstDecimalNum;
				sec = 0;
				secondFirstDecimalNum = 0;
				min = 0;
				minutLastDecimal.textContent = 0;
				secondLastDecimal.textContent = 0;
				secondFirstDecimal.textContent = 0;
			}
		}, 1000);
	};

	Dom.prototype.startGame = function() {
		if (state[accountId.id].playgame) {
			selectAccountBtn.onclick = () => {
				this.gamePlayDom();
				useGamePlay.call(this, accountId);
			};
		}
	};

	const dom = new Dom(document.querySelector('.piggame'));

	return { dom };
};

export default useDomHook;
