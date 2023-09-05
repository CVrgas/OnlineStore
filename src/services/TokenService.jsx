import Cookies from "js-cookie";

// servicio para el manejo de los tokens
// almacenados en cookies
export default class TokenService {
	// create el token en cookies
	setToken(token) {
		Cookies.set("token", token);
	}
	// returna el token en cookies
	getToken() {
		return Cookies.get("token");
	}
	// elimina el token en cookies
	removeToken() {
		Cookies.remove("token");
	}
}
