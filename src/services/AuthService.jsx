import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

class AuthService {
	constructor() {
		this.isAuthenticated = false;
	}

	async login(user) {
		try {
			const response = await fetch(
				"https://localhost:7038/OnlineStore/api/user/authenticate",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				}
			).catch((error) => {
				return { status: false, message: error.message };
			});

			if (!response.ok) {
				return { status: false, message: "Network response was not okay" };
			}

			const data = await response.json(); // Parse the response as JSON

			if (data && data.token) {
				const token = data.token;
				this.isAuthenticated = true;
				Cookies.set("token", token);
				Navigate("/");
				return { status: true, message: "validated", token: token };
				// Add your logic here based on the response
			} else {
				// Handle authentication failure
				return { status: false, message: "authentication failed" };
			}
		} catch (error) {
			// Handle any errors
			console.error("Error:", error);
			return {
				status: false,
				message: "Unknow Error Ocurred",
				detail: error.message,
			};
		}
	}

	logout() {
		Cookies.remove("token");
		this.isAuthenticated = false;
		return <Navigate to="/login" />;
	}
	loginWithToken() {
		const token = Cookies.get("token");
		if (token) {
			this.isAuthenticated = true;
		}
	}
	getStatus() {
		return this.isAuthenticated;
	}
}

export default new AuthService();
