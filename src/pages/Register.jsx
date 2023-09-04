import React, { useState } from "react";
import ApiService from "../assets/ApiService";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const navigate = useNavigate();
	const apiService = new ApiService(
		"https://localhost:7038/OnlineStore/api/user/"
	);

	const [message, setMessage] = useState("");

	function handleChange(e) {
		setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
	}

	async function onSubmit() {
		const isValid = validateForm();
		if (isValid.status === false) {
			setMessage(isValid.message);
		} else {
			setMessage("");
			const request = {
				name: form.username,
				email: form.email,
				password: form.password,
			};
			try {
				const user = await apiService.signup(request);
				if (user) {
					navigate("/login");
				}
			} catch (error) {
				setMessage(error.message);
				console.error(error);
			}
		}
	}

	function validateForm() {
		if (form.username.trim() === "") {
			return { status: false, message: "invalid username" };
		}
		if (!form.email.includes("@")) {
			return { status: false, message: "invalid email" };
		}
		if (form.password.length <= 7) {
			return { status: false, message: "password too short" };
		}
		if (form.passwordConfirm !== form.password) {
			return {
				status: false,
				message: "password confirmation doesn't match password",
			};
		}

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
