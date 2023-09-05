import React, { useState } from "react";
import ApiService from "../services/ApiService";
import TokenService from "../services/TokenService";
import { useNavigate } from "react-router-dom";

// pantalla de ingreso
export default function Login({ toggleIsAuth }) {

	// tatos de el usuario
	const [user, setUser] = useState({ email: "", password: "" });

	// mensage de alerta
	const [message, setMessage] = useState("");

	// 
	const navigate = useNavigate();

	// servicio api de usuario
	const apiService = new ApiService(
		"https://localhost:7038/OnlineStore/api/user/authenticate"
	);

	// servicio de tokens
	const tokenService = new TokenService();

	// al ingresar datos en algun campo, actualiza la variable correspondiente
	function handleChange(e) {
		setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
	}

	// envia la forma al backend
	async function onSubmit() {
		//valida los datos
		const validation = validateForm();
		//si no son validos comunica el mensage
		if (validation.status === false) {
			setMessage(validation.message);
			return;
		}
		// manda la request de login al api
		try {
			const token = await apiService.login(user);

			// si se recivio un token, envia el usuario a la pagina principal
			if (token) {
				tokenService.setToken(token);
				toggleIsAuth(true);
				navigate("/");
			} else {
				console.log("invalid token");
			}
		} catch (error) {
			//comunica el error
			setMessage(error.message);
			console.error(error);
		}
	}
	//validador de los campos de usuario
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
				<form>
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
