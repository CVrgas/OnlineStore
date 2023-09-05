import axios from "axios";
import TokenService from "./TokenService";

// servicio para el manejo relacionado a los productos
export default class ProductService {
	constructor(ApiUrl) {
		// ruta
		this.ApiUrl = ApiUrl;
		this.tokenService = new TokenService();
	}

	// request para productos
	async fetchData({ options = {}, param }) {
		const token = this.tokenService.getToken();

		// si existe algun parametro se aplica
		const url = param
			? `${this.ApiUrl}/search?param=${param}`
			: `${this.ApiUrl}`;

		// se valida que se tenga el token
		if (!token) return;

		try {
			//llamada al servidor
			const response = await axios.get(url, {
				...options,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			// si el token no esta validado
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
	//funcion para agregar datos al servidor
	async addData(data) {
		//confirmar que existe un roken
		const token = this.tokenService.getToken();
		if (!token) return;

		try {
			// llamada al servidor para agregar dato
			const response = await axios.post(this.ApiUrl, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// si la respuesta del servidor no esta bien
			if (response.status !== 200) {
				throw new Error("response not ok");
			}
			return response.data;
		} catch (error) {
			//manejo de errores
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
