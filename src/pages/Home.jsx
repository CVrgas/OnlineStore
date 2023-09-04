import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailedProduct from "../components/DetailedProduct/DetailedProduct";
import SubHeader from "../components/SubHeader/SubHeader";
import ProductService from "../assets/ProductsService";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selected, setSelected] = useState();
	const pService = new ProductService();

	async function searchProduct() {
		const response = await pService.getProduct({ option: searchQuery });
		if (response) {
			setProducts(response);
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
			<SubHeader
				setSearchQuery={setSearchQuery}
				search={searchProduct}
			></SubHeader>

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
