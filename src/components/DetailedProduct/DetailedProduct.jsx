import React, { useState } from "react";
import Styles from "./DetailedProduct.module.css";
import ProductService from "../../assets/ProductsService";

export default function DetailedProduct({ product, unselect }) {
	const [activeImg, setActiveImg] = useState("");
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);

	const handleActive = (e) => {
		const url = e.target.id;
		setActiveImg(url);
	};
	return (
		<div className={Styles.container}>
			<div className={Styles.wrapper}>
				<div className={Styles.images}>
					<img
						src={
							activeImg ||
							(product.images && product.images[0]) ||
							"https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
						}
						alt="images of the product"
					/>
					{
						<form className={Styles.options}>
							{product.imagesUrl.map((url, index) => {
								return (
									<input
										key={index}
										type="radio"
										name="image-options"
										id={url}
										defaultChecked={index === 0}
										onClick={handleActive}
									/>
								);
							})}
						</form>
					}
				</div>
				<div className={Styles.body}>
					<h5>{product.name}</h5>
					<hr />
					<p>{product.description}</p>

					<h3>${product.price}</h3>
					<small>In stock ({product.stock} available)</small>
					<hr />
					<div className={Styles.buttons}>
						<button className={Styles.editBtn}>Edit</button>
						<button className={Styles.deleteBtn}>Delete</button>
					</div>
				</div>
				<button
					className={Styles.closeBtn}
					onClick={unselect}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	);
}
// "id": 1,
// 			"title": "iPhone 9",
// 			"description": "An apple mobile which is nothing like apple",
// 			"price": 549,
// 			"discountPercentage": 12.96,
// 			"rating": 4.69,
// 			"stock": 94,
// 			"brand": "Apple",
// 			"category": "smartphones",
// 			"thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
// 			"images":
