const useState = function() {
	const state = {};

	//set state method
	const setState = (obj) => {
		console.log(state);
		return Object.assign(state, obj);
	};

	return { state, setState };
};

export default useState;
