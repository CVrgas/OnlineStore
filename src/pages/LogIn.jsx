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

					<button
						className="submit-button"
						type="button"
						onClick={onSubmit}
					>
						<span>Log in</span>
						<i className="fa-solid fa-chevron-right"></i>
					</button>
					{message ? <p className="message">{message}</p> : null}
				</form>
			</div>
		</main>
	);
}
