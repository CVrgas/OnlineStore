import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { useEffect, useState } from "react";
import TokenService from "./assets/TokenService";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const tokenService = new TokenService();

	useEffect(() => {
		const token = tokenService.getToken();
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<>
			<BrowserRouter>
				<Layout
					isAuthenticated={isAuthenticated}
					setIsAuthenticated={setIsAuthenticated}
				>
					<Routes>
						<Route element={<ProtectedRoutes />}>
							<Route
								path="/"
								element={<Home />}
							/>
						</Route>
						<Route
							path="/login"
							element={<LogIn toggleIsAuth={setIsAuthenticated} />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	);
}

export default App;
