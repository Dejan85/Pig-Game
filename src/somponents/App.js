import useDomHook from './hooks/dom/useDomHook';

const { dom } = useDomHook();

dom.createGameDom();
// dom.gamePlayDom();

// load acc
dom.loadAccount();

//add click event on create acc btn
dom.domDidMount().addAccountBtn.addEventListener('click', () => {
	dom.createAccount();
});
