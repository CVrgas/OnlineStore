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
					<h1 className="form-header">Register</h1>
					<input
						type="text"
						placeholder="username"
						name="username"
						onChange={handleChange}
						required
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						placeholder="password"
						name="password"
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						placeholder="confirm password"
						name="passwordConfirm"
						onChange={handleChange}
						required
					/>
					<button
						type="button"
						onClick={onSubmit}
					>
						submit
					</button>
					{message ? <p className="message">{message}</p> : null}
				</form>
			</div>
		</main>
	);
}
