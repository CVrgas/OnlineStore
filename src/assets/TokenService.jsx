import Cookies from "js-cookie";

export default class TokenService {
	setToken(token) {
		Cookies.set("token", token);
	}
	getToken() {
		return Cookies.get("token");
	}
	removeToken() {
		Cookies.remove("token");
	}
}
