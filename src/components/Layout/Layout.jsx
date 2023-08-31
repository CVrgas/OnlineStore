import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import LogIn from "../../pages/LogIn";
import Register from "../../pages/Register";

export default function Layout() {
	return (
		<>
			<Header></Header>

			<Routes>
				<Route
					path="/"
					element={<Home />}
				></Route>
				<Route
					path="/login"
					element={<LogIn />}
				></Route>
				<Route
					path="/register"
					element={<Register />}
				></Route>
				<Route
					path="*"
					element={
						<>
							<main>
								<h1>not Found</h1>
							</main>
						</>
					}
				></Route>
			</Routes>

			<Footer></Footer>
		</>
	);
}
