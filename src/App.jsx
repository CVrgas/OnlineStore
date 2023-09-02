import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { useEffect, useState } from "react";
import AuthService from "./assets/AuthService";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const toggleIsAuth = (state) => {
		setIsAuthenticated(state);
	};
	const handleLogout = async () => {
		AuthService.logout();
		setIsAuthenticated(AuthService.isAuthenticated);
	};
	useEffect(() => {
		setIsAuthenticated(AuthService.isAuthenticated);
	});

	return (
		<>
			<BrowserRouter>
				<Layout
					isAuthenticated={isAuthenticated}
					handleLogout={handleLogout}
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
							element={<LogIn toggleIsAuth={toggleIsAuth} />}
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
