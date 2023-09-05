import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailedProduct from "../components/DetailedProduct/DetailedProduct";
import SubHeader from "../components/SubHeader/SubHeader";
import ProductService from "../services/ProductsService";
import AddNew from "../components/AddNew/AddNew";
import EditCard from "../components/EditCard/EditCard";

export default function Home() {
	//componente principal

	// Resultados de fecth
	const [products, setProducts] = useState([]);

	// Query para filtar los productos
	const [searchQuery, setSearchQuery] = useState("");

	// Objeto que se quiere ver
	const [toView, setToView] = useState();

	// Objeto que se quiere editar
	const [toEdit, setToEdit] = useState();

	// abilita la targeta para agregar nuevo elemento
	const [isAdding, setIsadding] = useState(false);

	// servicio para el menoje de los productos
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);

	async function searchProduct() {
		try {
			// pide productos del servidor los cuales contengan el search query.
			// de no haber query returna todos
			const response = await pService.fetchData({ param: searchQuery });
			if (response) {
				//guarda los productos en la variable productos
				setProducts(response.reverse());
			}
		} catch (error) {
			//manejo del error
			console.error(error.message);
		}
	}

	// funcion que altera la variable isAdding
	const toggleAdding = () => {
		setIsadding((current) => !current);
	};

	//funcion muestra la pantalla de editar y esconde la pantalla de view
	function toggleToEdit(productToEdit) {
		setToEdit(productToEdit);
		setToView("");
	}

	// cuando incie la pagina carga los productos
	useEffect(() => {
		searchProduct();
	}, []);

	return (
		<main>
			{/* muestra la pantalla de view si existe */}
			{toView && (
				<DetailedProduct
					product={toView}
					unselect={setToView}
					toEdit={toggleToEdit}
				/>
			)}
			{/* muestra la pantalla de agregar si existe */}
			{isAdding && <AddNew toggleAdding={toggleAdding} />}

			{/* muestra la pantalla de editar si existe */}
			{toEdit && (
				<EditCard
					productToEdit={toEdit}
					toggleToEdit={setToEdit}
				/>
			)}
			{/* barra de busqueda y agregar  */}
			<SubHeader
				setSearchQuery={setSearchQuery}
				search={searchProduct}
				toggleAdding={toggleAdding}
			/>
			{/* lista de productos */}
			<ProductCard
				products={products}
				select={setToView}
			/>
		</main>
	);
}
