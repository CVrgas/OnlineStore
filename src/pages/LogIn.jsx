import React, { useState } from "react";
import ApiService from "../services/ApiService";
import TokenService from "../services/TokenService";
import { useNavigate } from "react-router-dom";

export default function Login({ toggleIsAuth }) {
	const [user, setUser] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const apiService = new ApiService(
		"https://localhost:7038/OnlineStore/api/user/authenticate"
	);
	const tokenService = new TokenService();

	function handleChange(e) {
		setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
	}

	async function onSubmit() {
		const validation = validateForm();
		if (validation.status === false) {
			setMessage(validation.message);
			return;
		}
		try {
			const token = await apiService.login(user);
			if (token) {
				tokenService.setToken(token);
				toggleIsAuth(true);
				navigate("/");
			} else {
				console.log("invalid token");
			}
		} catch (error) {
			setMessage(error.message);
			console.error(error);
		}
	}
	function validateForm() {
		if (!user.email.includes("@")) {
			return { status: false, message: "invalid email" };
		}
		if (user.password.length <= 4) {
			return { status: false, message: "password too short" };
		}

		return { status: true, message: "valid" };
	}
	return (
		<main>
			<div className="form-container">
				<form
					action=""
					onSubmit={onSubmit}
				>
					<h1 className="form-header">login</h1>
					<div className="input-element">
						<input
							type="email"
							name="email"
							placeholder=""
							id="email"
							required
							onChange={handleChange}
						/>
						<label htmlFor="email">Email</label>
						<i className="fa-solid fa-at"></i>
					</div>
					<div className="input-element">
						<input
							type="password"
							name="password"
							placeholder=""
							id="password"
							required
							onChange={handleChange}
						/>
						<label htmlFor="password">Password</label>
						<i className="fa-solid fa-lock"></i>
					</div>

					<a
						href="#"
						className="forgot-label"
					>
						Forgot password?
					</a>
					<p className="alert-message">{message}</p>

					<button
						className="submit-button"
						type="button"
						onClick={onSubmit}
					>
						<span>Log in</span>
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</form>
			</div>
		</main>
	);
}
