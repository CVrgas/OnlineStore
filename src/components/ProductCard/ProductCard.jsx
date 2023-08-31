import React from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
	return (
		<div className={styles.productCard}>
			<p>{product.name}</p>
			<p>{product.description}</p>
			<p>{product.price}</p>
			<p>{product.stock}</p>
		</div>
	);
}
