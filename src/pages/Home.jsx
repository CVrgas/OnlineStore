import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { ProductService } from "../assets/ProductsService";

export default function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		ProductService.getProduct({}).then((response) => {
			setProducts(response);
		});
	}, []);

	return (
		<main>
			<div className="container">
				{products.map((item, index) => {
					return (
						<ProductCard
							key={index}
							product={item}
						></ProductCard>
					);
				})}
			</div>
		</main>
	);
}
