import React, { useEffect, useState } from "react";
import { ProductService } from "../assets/ProductsService";
import ProductCard from "../components/ProductCard/ProductCard";
import DetailedProduct from "../components/DetailedProduct/DetailedProduct";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState();

	async function TestApi() {
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDcmlzdGlhblZyZ2FzQGdtYWlsLmNvbSIsImp0aSI6IjNjZjNjYmRjLWE3YmMtNDUwMy1hN2YwLTkyM2MxNjJiOWE1OSIsImlhdCI6IjkvMi8yMDIzIDg6MjQ6MDMgUE0iLCJleHAiOjE2OTM2ODk4NDMsImlzcyI6Ik9ubGluZVN0b3JlQXBpIiwiYXVkIjoiT25saW5lU3RvcmVDbGllbnQifQ.m4Ns1F5TrRmyE8QjpZBYSG20WEljNiYeGWqTns3lQiE";

		fetch("https://localhost:7038/OnlineStore/api/product", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				// Do something with the fetched data
				console.log(data);
			})
			.catch((error) => {
				// Handle any errors that occurred during the request
				console.error(error);
			});
	}
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
				<i class="fa-solid fa-magnifying-glass"></i>
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
