import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
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
						<li>
							<Link to="/login">Log In</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
