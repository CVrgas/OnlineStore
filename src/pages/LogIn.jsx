import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../assets/AuthService";

export default function LogIn({ toggleIsAuth }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("");

	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}
	
	async function onSubmit() {
		await AuthService.login(user).then((response) => {
			toggleIsAuth(response.status);
			if (response.status === false) {
				setMessage(response.message);
			} else {
				if (location.state?.from) {
					navigate(location.state?.from);
				}
			}
		});
	}

	return (
		<main>
			<div className="form-container">
				<form
					action=""
					onSubmit={onSubmit}
				>
					<h1 className="form-header">log In</h1>
					<input
						type="email"
						placeholder="email"
						name="email"
						required
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="password"
						name="password"
						required
						onChange={handleChange}
					/>
					<button
						type="button"
						onClick={onSubmit}
					>
						Submit
					</button>
					{message ? <p className="message">{message}</p> : null}
				</form>
			</div>
		</main>
	);
}
