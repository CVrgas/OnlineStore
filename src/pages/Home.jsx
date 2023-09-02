import React, { useEffect, useState } from "react";
import { ProductService } from "../assets/ProductsService";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");

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
	async function TestApi() {
		console.log("init");
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDcmlzdGlhblZyZ2FzQGdtYWlsLmNvbSIsImp0aSI6IjgwNTg5ZTgxLWRiNzYtNDMyMi1iZWU0LWY5YjNkZjZiNmIyOSIsImlhdCI6IjkvMS8yMDIzIDk6MTA6MzggUE0iLCJleHAiOjE2OTM2MDYyMzgsImlzcyI6Ik9ubGluZVN0b3JlQXBpIiwiYXVkIjoiT25saW5lU3RvcmVDbGllbnQifQ.vWVgw13scnciC0x2pqNLKdUwMISgmhmLdwfOtzY3OFQ";

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
	useEffect(() => {
		getProduct();
	}, []);
	useEffect(() => {
		handleSearch();
	}, [search]);

	return (
		<main>
			<div className="home-container">
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</main>
	);
}
