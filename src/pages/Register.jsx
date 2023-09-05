import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

//gaina de registro
export default function Register() {
	// campos de la forma
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	//
	const navigate = useNavigate();

	//servicio de api de usurio
	const apiService = new ApiService(
		"https://localhost:7038/OnlineStore/api/user/"
	);

	//mensagge de alerta
	const [message, setMessage] = useState("");

	//cuando un campo de la forma es actualizado actualiza
	//su valor en variable form
	function handleChange(e) {
		setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
	}
	// envia la forma a la api
	async function onSubmit() {
		//valida la forma
		const isValid = validateForm();
		if (isValid.status === false) {
			//alerta al usuario del algun error
			setMessage(isValid.message);
		} else {
			//restableze el mensaje de alerta
			setMessage("");

			// crea el objecto usuario
			const request = {
				name: form.username,
				email: form.email,
				password: form.password,
			};
			try {
				// llama a la api
				const user = await apiService.signup(request);
				if (user) {
					// de ser exitoso lo envia a la pagina de login
					navigate("/login");
				}
			} catch (error) {
				// alerta de algun error
				setMessage(error.message);
				console.error(error);
			}
		}
	}

	// validador de la form
	function validateForm() {
		//si username esta en blanco
		if (form.username.trim() === "") {
			return { status: false, message: "invalid username" };
		}
		//si email no tiene @
		if (!form.email.includes("@")) {
			return { status: false, message: "invalid email" };
		}
		//si la contraseña es menor a 7
		if (form.password.length <= 7) {
			return { status: false, message: "password too short" };
		}
		//si la comfirmacion no es igual a la contraseña
		if (form.passwordConfirm !== form.password) {
			return {
				status: false,
				message: "password confirmation doesn't match password",
			};
		}
		// si todo esta bien
		return { status: true, message: "valid" };
	}

	return (
		<main>
			<div className="form-container">
				<form
					action="https://example.com"
					onSubmit={onSubmit}
				>
					<h1 className="form-header">Signup</h1>
					<div className="input-element">
						<input
							type="text"
							name="username"
							placeholder=""
							id="username"
							required
							onChange={handleChange}
						/>
						<label htmlFor="username">username</label>
						<i className="fas fa-user"></i>
					</div>
					<div className="input-element">
						<input
							type="email"
							name="email"
							placeholder=""
							id="email"
							required
							onChange={handleChange}
						/>
						<label htmlFor="email">email</label>
						<i className="fas fa-envelope"></i>
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
						<label htmlFor="password">password</label>
						<i className="fas fa-lock"></i>
					</div>
					<div className="input-element">
						<input
							type="password"
							name="passwordConfirm"
							placeholder=""
							id="passwordConfirm"
							required
							onChange={handleChange}
						/>
						<label htmlFor="passwordConfirm">confirm password</label>
						<i className="fas fa-lock"></i>
					</div>
					<a
						href="https://example.com"
						className="forgot-label"
					>
						Already registered?
					</a>
					<p className="alert-message">{message}</p>
					<button
						className="submit-button"
						type="button"
						onClick={onSubmit}
					>
						<span>Sign up</span>
						<i className="fas fa-chevron-right"></i>
					</button>
				</form>
			</div>
		</main>
	);
}
