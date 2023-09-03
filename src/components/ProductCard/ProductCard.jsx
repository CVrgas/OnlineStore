import React from "react";
import Styles from "./ProductCard.module.css";

export default function Card({ product, select }) {
	return (
		<div
			className={Styles.card}
			onClick={() => select(product)}
		>
			<div className={Styles.image}>
				<img
					src={product.thumbnail}
					alt=""
				/>
			</div>
			<div className={Styles.body}>
				<div className={Styles.brandTitle}>
					<h5>{product.title}</h5>
					<small>{product.brand}</small>
				</div>
				<p className={Styles.description}>{product.description}</p>
				<h3 className={Styles.price}>
					<p>
						<span>$</span>
						{product.price}
					</p>
				</h3>

				<small className={Styles.stock}>{product.stock} in stock</small>
			</div>
		</div>
	);
}
