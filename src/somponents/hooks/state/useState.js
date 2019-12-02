const useState = function() {
	const state = { input: 100, account: JSON.parse(localStorage.getItem('users')) };

	//set state method
	const setState = (obj) => {
		Object.assign(state, obj);
		console.log(state);
	};

	return { state, setState };
};

export default useState;
