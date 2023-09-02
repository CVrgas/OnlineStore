import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ isAuthenticated, handleLogout, children }) {
	return (
		<>
			<Header
				isAuthenticated={isAuthenticated}
				logout={handleLogout}
			></Header>
			{children}
			<Footer></Footer>
		</>
	);
}
