import { gamePlayHtml, createGameHtml } from './useHtmlAsString';
import useLocalStorage from '../localStorage/useLocalStorage';
import useState from '../state/useState';
import { isObject } from 'util';

const useDomHook = function() {
	const { createAccount, getAccount, removeAccountById } = useLocalStorage();
	const { state, setState } = useState();

	function Dom(piggame) {
		this.piggame = piggame;
	}

	// loaed game play html to dom
	Dom.prototype.gamePlayDom = function() {
		this.piggame.style.padding = '0 5rem';
		this.piggame.innerHTML = gamePlayHtml;
	};

	// load create game html to dom
	Dom.prototype.createGameDom = function() {
		this.piggame.innerHTML = createGameHtml;
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
			historyList: document.querySelector('#historyList'),

			// game play
			rolldiceBtn: document.querySelector('.piggame__btns--rolldice'),
			holdBtn: document.querySelector('.piggame__btns--hold'),
			playerScore: document.querySelector('#playerScore'),
			playerCurrent: document.querySelector('#playerCurrent'),
			rivalScore: document.querySelector('#rivalScore'),
			rivalCurrent: document.querySelector('#rivalCurrent')
		};
	};

	// create new account
	Dom.prototype.createAccount = function() {
		const { piggameCreate } = this.domDidMount();

		// const accountHtml = `<p><i class="far fa-user"></i><span>Dejan</span><i class="far fa-trash-alt"></i>`;
		// const totalBudgetHtml = `<div class="piggame__amount--money"><p>$</p><p>1000</p></div>`;
		// const historyHtml = `<div class="piggame__history--date"><p>27. 11. 2019.</p><p>300</p><p>0</p></div>`;
		const createAccInput = `<div class="createAccInput"><div class="createAccInput__input"><input autofocus id="input" placeholder="Enter Name"></div></div>`;
		piggameCreate.innerHTML += createAccInput;

		document.querySelector('#input').onkeypress = (e) => {
			if (e.keyCode === 13 || e.charCode === 13) {
				const input = document.querySelector('.createAccInput');
				createAccount(e.target.value);
				input.parentNode.removeChild(input);
				// call this hook again coz we need make rerender effect
				this.loadAccount();
			}
		};
	};

	// load acc from local storage
	Dom.prototype.loadAccount = function() {
		const { accountList, totalBudgetList, historyList } = this.domDidMount();

		setState({
			account: JSON.parse(localStorage.getItem('users'))
		});

		// reset dom to not get duplicate
		accountList.innerHTML = '';
		totalBudgetList.innerHTML = '';
		historyList.innerHTML = '';

		// getAccount() &&
		// 	getAccount().forEach((item, index) => {
		// 		accountList.innerHTML += `<p><i class="far fa-user"></i><span>${item.name}</span><i id="deleteBtn" data-key=${index} class="far fa-trash-alt"></i>`;
		// 		totalBudgetList.innerHTML += `<div class="piggame__amount--money"><p>$</p><p>${item.money}</p></div>`;
		// 		historyList.innerHTML += `<div class="piggame__history--date"></div>`;
		// 		[ ...document.querySelectorAll('.piggame__history--date') ].forEach((item) => {
		// 			// console.log(item);
		// 		});
		// 	});

		state.account &&
			state.account.forEach((item, index) => {
				accountList.innerHTML += `<p><i class="far fa-user"></i><span>${item.name}</span><i id="deleteBtn" data-key=${index} class="far fa-trash-alt"></i>`;
				totalBudgetList.innerHTML += `<div class="piggame__amount--money"><p>$</p><p>${item.money}</p></div>`;
				historyList.innerHTML += `<div class="piggame__history--date"></div>`;
				[ ...document.querySelectorAll('.piggame__history--date') ].forEach((item) => {
					// console.log(item);
				});
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
				removeAccountById(parseInt(this.getAttribute('data-key')));
				dom.loadAccount();
				setState({ playgame: false });
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
				setState({
					playgame: true,
					account: getAccount()[index]
				});
				this.btnTextContent();
			};
		});
	};

	// set bets on start game
	Dom.prototype.setBets = function() {
		const { betsDecrease, betsIncrease, input__value, betsBtns } = this.domDidMount();

		if (isObject(state.account)) {
			console.log('radi');
			console.log(state.account);
		}

		betsDecrease.onclick = () => {
			if (state.input > 0) {
				setState({
					input: --input__value.value
				});
			}
		};
		betsIncrease.onclick = () => {
			if (state.input < state.account.money) {
				setState({
					input: ++input__value.value
				});
			}
		};

		[ ...betsBtns.children ].forEach((item) => {
			item.onclick = function() {
				const amount = this.getAttribute('data-amount');

				if (amount === '1/2') {
					setState({
						input: +input__value.value + input__value.value * 0.5
					});
				}

				if (amount === '2x') {
					setState({
						input: +input__value.value + input__value.value * 2
					});
				}

				if (amount === 'min') {
					setState({
						input: 20
					});
				}

				if (amount === 'max') {
					setState({
						input: state.account.money
					});
				}
			};
		});
	};

	// Dom.prototype.setInputValue = function() {
	// 	const { input__value } = this.domDidMount();
	// 	input__value.value = state.input;
	// };

	// this method change text on button
	Dom.prototype.btnTextContent = function() {
		const { selectAccountBtn } = this.domDidMount();
		// console.log(state);
		if (state.playgame) {
			selectAccountBtn.textContent = 'Play Game';
		} else {
			selectAccountBtn.textContent = 'Select Account';
		}
	};

	const dom = new Dom(document.querySelector('.piggame'));

	return { dom };
};

export default useDomHook;
