import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import TokenService from "../../services/TokenService";

export default function Header({ isAuthenticated, setIsAuthenticated }) {
	const tokenService = new TokenService();

	const navigate = useNavigate();

	const handleLogout = () => {
		tokenService.removeToken();
		setIsAuthenticated(false);
		navigate("/login");
	};

	return (
		<>
			<header className={styles.appHeader}>
				<Link
					to="/"
					className={styles.logo}
				>
					AllStore
				</Link>

				<nav>
					<ul>
						{isAuthenticated ? (
							<li>
								<button onClick={handleLogout}>
									<i className="fa-solid fa-right-from-bracket"></i> Logout
								</button>
							</li>
						) : (
							<>
								<li>
									<Link to="/login">Login</Link>
								</li>
								<li>
									<Link
										to="/register"
										className={styles.signupBtn}
									>
										Signup
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
}
