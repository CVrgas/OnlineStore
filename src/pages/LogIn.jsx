import React, { useState } from "react";
import service from "../assets/LocalService";

export default function LogIn() {
	const [user, setUser] = useState({ username: "", password: "" });
	const [message, setMessage] = useState("");

	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}
	function onSubmit() {
		service.login(user).then((response) => {
			console.log(response.status);
			if (response.status === false) {
				setMessage(response.message);
				return;
			}
			setMessage("");
			console.log(document.cookie);
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
						type="text"
						placeholder="username"
						name="username"
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
