import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({
	isAuthenticated,
	setIsAuthenticated,
	children,
}) {
	return (
		<>
			<Header
				isAuthenticated={isAuthenticated}
				setIsAuthenticated={setIsAuthenticated}
			></Header>
			{children}
			{/* <Footer></Footer> */}
		</>
	);
}
