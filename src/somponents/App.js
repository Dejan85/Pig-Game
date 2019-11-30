import useDomHook from './hooks/dom/useDomHook';

const { dom } = useDomHook();

dom.createGameDom();
// dom.gamePlayDom();

// load acc
dom.loadAccount();

dom.domDidMount().addAccountBtn.addEventListener('click', () => {
	dom.createAccount();
});
// dom.createAccount();
