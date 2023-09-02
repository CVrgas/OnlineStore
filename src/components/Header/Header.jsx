import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({ isAuthenticated, logout }) {
	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<header className={styles.appHeader}>
				<Link
					to="/"
					className={styles.logo}
				>
					Logo
				</Link>
				<nav>
					<ul>
						{isAuthenticated ? (
							<li>
								<button onClick={handleLogout}>Logout</button>
							</li>
						) : (
							<>
								<li>
									<Link to="/register">Register</Link>
								</li>
								<li>
									<Link to="/login">Login</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
}
