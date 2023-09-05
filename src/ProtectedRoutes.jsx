import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import TokenService from "./services/TokenService";

// Importar los módulos necesarios de React y react-router-dom

const ProtectedRoutes = () => {
	// Definir la ubicación actual del enrutador
	const location = useLocation();

	// Crear una instancia de la clase TokenService
	const tokenservice = new TokenService();

	// Verificar si existe un token en el TokenService
	// Si existe, mostrar los componentes de las rutas protegidas (Outlet)
	// Si no existe, redirigir al usuario a la página de inicio de sesión (Login) con la ubicación actual
	return tokenservice.getToken() ? (
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
