import { gamePlayHtml, createGameHtml } from './useHtmlAsString';
import useLocalStorage from '../localStorage/useLocalStorage';
import useState from '../state/useState';

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
		// const accountHtml = `<p><i class="far fa-user"></i><span>Dejan</span><i class="far fa-trash-alt"></i>`;
		// const totalBudgetHtml = `<div class="piggame__amount--money"><p>$</p><p>1000</p></div>`;
		// const historyHtml = `<div class="piggame__history--date"><p>27. 11. 2019.</p><p>300</p><p>0</p></div>`;
		const createAccInput = `<div class="createAccInput"><div class="createAccInput__input"><input id="input" placeholder="Enter Name"></div></div>`;
		this.domDidMount().piggameCreate.innerHTML += createAccInput;

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
		// reset dom to not get duplicate
		this.domDidMount().accountList.innerHTML = '';
		this.domDidMount().totalBudgetList.innerHTML = '';
		this.domDidMount().historyList.innerHTML = '';

		getAccount() &&
			getAccount().forEach((item, index) => {
				this.domDidMount().accountList.innerHTML += `<p><i class="far fa-user"></i><span>${item.name}</span><i id="deleteBtn" data-key=${index} class="far fa-trash-alt"></i>`;
				this.domDidMount().totalBudgetList.innerHTML += `<div class="piggame__amount--money"><p>$</p><p>${item.money}</p></div>`;
				this.domDidMount().historyList.innerHTML += `<div class="piggame__history--date"></div>`;
				[ ...document.querySelectorAll('.piggame__history--date') ].forEach((item) => {
					// console.log(item);
				});
			});

		// delete account
		this.deleteAccount();
		this.btnTextContent();
		this.selectAccount();
	};

	// delece account method
	Dom.prototype.deleteAccount = function() {
		[ ...document.querySelectorAll('#deleteBtn') ].forEach((item) => {
			item.onclick = function() {
				removeAccountById(parseInt(this.getAttribute('data-key')));
				dom.loadAccount();
			};
		});

		setState({ playgame: false });

		this.btnTextContent();
	};

	// select account method
	Dom.prototype.selectAccount = function() {
		[ ...this.domDidMount().accountList.children ].forEach((item, index) => {
			item.onclick = () => {
				[ ...this.domDidMount().accountList.children ].forEach((item2) => (item2.style.background = '#43587f'));
				item.style.background = '#556FA0';

				setState({
					playgame: true,
					account: getAccount()[index]
				});
				this.btnTextContent();
			};
		});
	};

	// this method change text on button
	Dom.prototype.btnTextContent = function() {
		console.log(state);
		if (state.playgame) {
			this.domDidMount().selectAccountBtn.textContent = 'Play Game';
		} else {
			this.domDidMount().selectAccountBtn.textContent = 'Select Account';
		}
	};

	const dom = new Dom(document.querySelector('.piggame'));

	return { dom };
};

export default useDomHook;
