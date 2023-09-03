import axios from "axios";

export default class ApiService {
	constructor(ApiUrl) {
		this.ApiUrl = ApiUrl;
	}
	async login(user) {
		try {
			const response = await axios.post(`${this.ApiUrl}`, user);
			if (response.status === 200 && response.data.token) {
				return response.data.token;
			} else {
				throw new Error("invalid response");
			}
		} catch (error) {
			throw new Error(`Login failed: ${error.message}`);
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
    
	async fetchData(endpoint, options = {}) {
		const url = `${this.ApiUrl}/${endpoint}`;
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error("response not ok");
			}
			return response.json();
		} catch (error) {
			throw new Error(`Error fetching data: ${error.message}`);
		}
	}
}
