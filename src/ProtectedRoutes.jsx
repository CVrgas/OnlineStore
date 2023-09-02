import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "./assets/AuthService";

const ProtectedRoutes = () => {
	const location = useLocation();
	AuthService.loginWithToken();

	return AuthService.isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace
			state={{ from: location }}
		/>
	);
};

export default ProtectedRoutes;
