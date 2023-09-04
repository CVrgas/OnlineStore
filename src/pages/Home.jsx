import React, { useEffect, useState } from "react";
import { ProductService } from "../assets/ProductsService";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailedProduct from "../components/DetailedProduct/DetailedProduct";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState();

	function handleChange(e) {
		const input = e.target.value;
		if (input === "") {
			getProduct();
			return;
		}
		setSearch(input);
	}
	async function handleSearch() {
		await ProductService.getProduct({ option: search }).then((response) => {
			setProducts(response);
		});
	}
	async function getProduct() {
		await ProductService.getProduct({}).then((response) => {
			setProducts(response);
		});
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
		getProduct();
	}, []);
	useEffect(() => {
		handleSearch();
	}, [search]);

	return (
		<main>
			{selected ? (
				<DetailedProduct
					product={selected}
					unselect={UnSelect}
				></DetailedProduct>
			) : null}
			<div className="search-container">
				<i className="fa-solid fa-magnifying-glass"></i>
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="product-container">
				{products.map((item, index) => {
					return (
						<ProductCard
							key={item.id}
							product={item}
							select={handleSelection}
						></ProductCard>
					);
				})}
			</div>
		</main>
	);
}
