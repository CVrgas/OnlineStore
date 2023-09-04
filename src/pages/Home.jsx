import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailedProduct from "../components/DetailedProduct/DetailedProduct";
import SubHeader from "../components/SubHeader/SubHeader";
import ProductService from "../assets/ProductsService";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selected, setSelected] = useState();
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);

	async function searchProduct() {
		try {
			const response = await pService.fetchData();
			if (response) {
				console.log(response);
				setProducts(response);
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	function handleSelection(item) {
		if (item) {
			setSelected(item);
		}
	}
	function UnSelect() {
		setSelected("");
	}
	useEffect(() => {
		searchProduct();
	}, []);
	return (
		<main>
			{selected ? (
				<DetailedProduct
					product={selected}
					unselect={UnSelect}
				></DetailedProduct>
			) : null}

			<ProductCard
				products={products}
				select={handleSelection}
			></ProductCard>
		</main>
	);
}
