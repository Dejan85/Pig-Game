const useLocalStorage = () => {
	// push account to local storage
	const createAccount = (name) => {
		const users = JSON.parse(localStorage.getItem('users')) || [];

		users.push({
			name: name,
			money: 1000,
			history: [ { date: '21. 11.2019', win: 1300, lose: 2500 }, { date: '19. 07. 1985', win: 4600, lose: 7500 } ]
		});

		localStorage.setItem('users', JSON.stringify(users));
	};

	// load acc from local storage
	const getAccount = () => {
		const account = JSON.parse(localStorage.getItem('users'));
		return account;
	};

	// remove acc from local storage
	const removeAccountById = (id) => {
		const users = JSON.parse(localStorage.getItem('users'));
		const accounts = users.filter((item, index) => {
			return index !== id;
		});

		localStorage.setItem('users', JSON.stringify(accounts));
		accounts.length = 0;
	};

	return { createAccount, getAccount, removeAccountById };
};

export default useLocalStorage;
