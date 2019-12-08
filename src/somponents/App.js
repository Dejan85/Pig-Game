import useDomHook from './hooks/dom/useDomHook';

const { dom } = useDomHook();

dom.createGameDom();

// load acc
dom.render();

//add click event on create acc btn
dom.domDidMount().addAccountBtn.addEventListener('click', () => {
	dom.createAccount();
});
