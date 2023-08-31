let accounts = [
	{
		username: "red",
		password: "123123123",
	},
];

export default class service {
	constructor() {}
	static async getAccounts() {
		console.log(accounts);
		return accounts;
	}

	static async createAccount(input) {
		if (accounts.find((acc) => acc.email === input.email)) {
			return { status: false, message: "email already exist" };
		}
		accounts.push(input);
		return { status: false, message: "user registered" };
	}

	static async login(input) {
		if (!input || !input?.username || !input?.password) {
			return { status: false, message: "invalid input" };
		}
		const user = accounts.find(
			(acc) =>
				acc.username === input.username && acc.password === input.password
		);
		if (user) {
			const date = new Date();
			date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

			const expires = "expires=" + date.toUTCString();
			document.cookie = `${JSON.stringify(user)}; ${expires}; path=/;`;
			return { status: true, message: "user Found" };
		}
		return { status: false, message: "user not found" };
	}
}
