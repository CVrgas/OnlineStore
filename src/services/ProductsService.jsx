import axios from "axios";
import TokenService from "./TokenService";

export default class ProductService {
	constructor(ApiUrl) {
		this.ApiUrl = ApiUrl;
		this.tokenService = new TokenService();
	}

	async fetchData({ options = {}, param }) {
		const token = this.tokenService.getToken();
		const url = param
			? `${this.ApiUrl}/search?param=${param}`
			: `${this.ApiUrl}`;
		if (!token) return;
		try {
			const response = await axios.get(url, {
				...options,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status === 401
			) {
				const token = this.tokenService.getToken();
				if (token) {
					this.tokenService.removeToken();
				}
				throw new Error("Unauthorized: Please login again.");
			} else {
				throw new Error("Error processing the request");
			}
		}
	}
	async addData(data) {
		const token = this.tokenService.getToken();
		if (!token) return;
		try {
			const response = await axios.post(this.ApiUrl, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status !== 200) {
				throw new Error("response not ok");
			}
			return response.data;
		} catch (error) {
			throw new Error("Error processing the request: ", error.message);
		}
	}
	async updateData(id, data) {
		const token = this.tokenService.getToken();
		const url = `${this.ApiUrl}/${id}`;
		console.log("url: ", url);
		if (!token) return;
		try {
			const response = await axios.put(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status !== 200) {
				throw new Error("response not ok");
			}
			return response.data;
		} catch (error) {
			throw new Error("Error processing the request");
		}
	}
	async deleteData(id) {
		const token = this.tokenService.getToken();
		const url = `${this.ApiUrl}/${id}`;
		try {
			const response = await axios.delete(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status !== 200) {
				throw new Error("response was not ok");
			}
			return response.data;
		} catch (error) {
			throw new Error("Error Processing request: ", error.message);
		}
	}
}
