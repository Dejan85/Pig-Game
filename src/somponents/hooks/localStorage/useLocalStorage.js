const useLocalStorage = () => {
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const createAccount = (name) => {
		users.push({
			name: name,
			money: 1000,
			history: [ { date: '21. 11.2019', win: 1300, lose: 2500 }, { date: '19. 07. 1985', win: 4600, lose: 7500 } ]
		});

		localStorage.setItem('users', JSON.stringify(users));
	};

	const getAccount = () => {
		return JSON.parse(localStorage.getItem('users'));
	};

	return { createAccount, getAccount };
};

export default useLocalStorage;
