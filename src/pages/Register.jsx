import React, { useState } from "react";

export default function Register() {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const [message, setMessage] = useState("");
	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function onSubmit() {
		const isValid = validateForm();
		if (isValid.status === false) {
			setMessage(isValid.message);
			return;
		}
		setMessage("");
		service.createAccount(form).then((response) => {
			if (response.status === false) {
				setMessage(response.message);
			}
		});
	}

	function validateForm() {
		if (form.username === "" || form.username === " ") {
			return { status: false, message: "invalid username" };
		}
		if (!form.email.includes("@")) {
			return { status: false, message: "invalid email" };
		}
		if (form.password.length <= 7) {
			return { status: false, message: "password to short" };
		}
		if (form.passwordConfirm !== form.password) {
			return {
				status: false,
				message: "password confirmation doesnt match password",
			};
		}

		return { status: true, message: "valid" };
	}

	return (
		<main>
			<div className="form-container">
				<form
					action=""
					// onSubmit={onSubmit}
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
						<i class="fa-solid fa-user"></i>
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
						<i class="fa-solid fa-envelope"></i>
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
						<i class="fa-solid fa-lock"></i>
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
						<i class="fa-solid fa-lock"></i>
					</div>
					<p className="alert-message">{message}</p>
					<button
						className="submit-button"
						type="button"
						onClick={onSubmit}
					>
						<span>Sign up</span>
						<i class="fa-solid fa-chevron-right"></i>
					</button>
				</form>
			</div>
		</main>
	);
}
