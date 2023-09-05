import axios from "axios";

// servicio para el manejo relacionado al usuario
export default class ApiService {
	constructor(ApiUrl) {
		// ruta
		this.ApiUrl = ApiUrl;
	}

	// logea al usuario
	async login(user) {
		try {
			const response = await axios.post(`${this.ApiUrl}`, user);

			if (response.status === 200 && response.data.token) {
				return response.data.token;
			} else {
				throw new Error("invalid response");
			}
		} catch (error) {
			if (error.response.status === 404) {
				throw new Error(
					"Sorry, the email and password you entered do not match"
				);
			}
			if (error.response.status === 400) {
				throw new Error("email or password invalid");
			}
			throw new Error(`Login failed: ${error}`);
		}
	}

	// registra al usuario
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
