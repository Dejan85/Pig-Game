const useState = function() {
	const state = JSON.parse(localStorage.getItem('accounts')) || [];
	const accountId = { id: undefined };
	const gamePlayState = {
		you: {
			total: 0
		},
		rival: {
			total: 0
		},
		current: 0,
		diceResult: 0,
		active: true,
		blockBtn: false,
		reset: false
	};

	const setAccountId = (id) => {
		return (accountId.id = id);
	};

	const setState = (acc) => {
		state.push(acc);
		localStorage.setItem('accounts', JSON.stringify(state));
	};

	const editState = (id, name, value) => {
		state[id][name] = value;
	};

	const removeByIdFromState = (id) => {
		state.splice(id, 1);
		localStorage.setItem('accounts', JSON.stringify(state));
	};

	return {
		state,
		setState,
		removeByIdFromState,
		accountId,
		setAccountId,
		editState,
		gamePlayState
	};
};

export default useState;
