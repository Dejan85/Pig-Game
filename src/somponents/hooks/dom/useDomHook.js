import { gamePlayHtml, createGameHtml } from './useHtmlAsString';
import useLocalStorage from '../localStorage/useLocalStorage';

const useDomHook = function() {
	const { createAccount, getAccount } = useLocalStorage();

	function Dom(piggame) {
		this.piggame = piggame;
	}

	Dom.prototype.gamePlayDom = function() {
		this.piggame.style.padding = '0 5rem';
		this.piggame.innerHTML = gamePlayHtml;
	};

	Dom.prototype.createGameDom = function() {
		this.piggame.innerHTML = createGameHtml;
	};

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

			//game play
			rolldiceBtn: document.querySelector('.piggame__btns--rolldice'),
			holdBtn: document.querySelector('.piggame__btns--hold'),
			playerScore: document.querySelector('#playerScore'),
			playerCurrent: document.querySelector('#playerCurrent'),
			rivalScore: document.querySelector('#rivalScore'),
			rivalCurrent: document.querySelector('#rivalCurrent')
		};
	};

	Dom.prototype.createAccount = function() {
		const accountHtml = `<p><i class="far fa-user"></i><span>Dejan</span><i class="far fa-trash-alt"></i>`;
		const totalBudgetHtml = `<div class="piggame__amount--money"><p>$</p><p>1000</p></div>`;
		const historyHtml = `<div class="piggame__history--date"><p>27. 11. 2019.</p><p>300</p><p>0</p></div>`;
		const createAccInptu = `<div class="createAccInput"><div class="createAccInput__input"><input id="input" placeholder="Enter Name"></div></div>`;
		this.domDidMount().piggameCreate.innerHTML += createAccInptu;

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

	Dom.prototype.loadAccount = function() {
		// reset dom to not get duplicate
		this.domDidMount().accountList.innerHTML = '';
		this.domDidMount().totalBudgetList.innerHTML = '';
		this.domDidMount().historyList.innerHTML = '';

		getAccount() &&
			getAccount().forEach((item) => {
				this.domDidMount().accountList.innerHTML += `<p><i class="far fa-user"></i><span>${item.name}</span><i class="far fa-trash-alt"></i>`;
				this.domDidMount().totalBudgetList.innerHTML += `<div class="piggame__amount--money"><p>$</p><p>${item.money}</p></div>`;
				this.domDidMount().historyList.innerHTML += `<div class="piggame__history--date"></div>`;
				[ ...document.querySelectorAll('.piggame__history--date') ].forEach((item) => {
					// console.log(item);
				});
			});
	};

	const dom = new Dom(document.querySelector('.piggame'));

	return { dom };
};

export default useDomHook;
