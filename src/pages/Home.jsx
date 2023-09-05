import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailedProduct from "../components/DetailedProduct/DetailedProduct";
import SubHeader from "../components/SubHeader/SubHeader";
import ProductService from "../assets/ProductsService";
import AddNew from "../components/AddNew/AddNew";
import EditCard from "../components/EditCard/EditCard";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [toView, setToView] = useState();
	const [toEdit, setToEdit] = useState();
	const [isAdding, setIsadding] = useState(false);
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);

	async function searchProduct() {
		try {
			const response = await pService.fetchData({ param: searchQuery });
			if (response) {
				setProducts(response.reverse());
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	const toggleAdding = () => {
		setIsadding((current) => !current);
	};
	function toggleToEdit(productToEdit) {
		setToEdit(productToEdit);

		setToView("");
	}

	useEffect(() => {
		searchProduct();
	}, []);

	return (
		<main>
			{toView ? (
				<DetailedProduct
					product={toView}
					unselect={setToView}
					toEdit={toggleToEdit}
				></DetailedProduct>
			) : null}
			{isAdding ? <AddNew toggleAdding={toggleAdding} /> : null}
			{toEdit ? (
				<EditCard
					productToEdit={toEdit}
					toggleToEdit={setToEdit}
				/>
			) : null}
			<SubHeader
				setSearchQuery={setSearchQuery}
				search={searchProduct}
				toggleAdding={toggleAdding}
			></SubHeader>
			<ProductCard
				products={products}
				select={setToView}
			></ProductCard>
		</main>
	);
}
