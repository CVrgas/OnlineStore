import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import TokenService from "../../services/TokenService";

export default function Header({ isAuthenticated, setIsAuthenticated }) {
	const tokenService = new TokenService();

	const navigate = useNavigate();

	// Función para manejar el cierre de sesión
	const handleLogout = () => {
		// Eliminar el token de autenticación
		tokenService.removeToken();
		// Establecer el estado de autenticación en falso
		setIsAuthenticated(false);
		// Navegar a la página de inicio de sesión
		navigate("/login");
	};

	return (
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
	);
}
