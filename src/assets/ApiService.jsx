import axios from "axios";

export default class ApiService {
	constructor(ApiUrl) {
		this.ApiUrl = ApiUrl;
	}
	async login(user) {
		try {
			const response = await axios.post(`${this.ApiUrl}`, user);

			if (response.status === 404) {
				throw new Error("email or password invalid");
			}

			if (response.status === 200 && response.data.token) {
				return response.data.token;
			} else {
				throw new Error("invalid response");
			}
		} catch (error) {
			throw new Error(`Login failed: ${error}`);
		}
	}
	async signup(request) {
		try {
			const response = await axios.post(`${this.ApiUrl}`, request);
			if (response.status === 200) {
				return response;
			} else {
				throw new Error("invalid response");
			}
		} catch (error) {
			throw new Error(`Signup falied: ${error.message}`);
		}
	}
}
