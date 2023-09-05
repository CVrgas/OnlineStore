import React, { useState } from "react";
import Styles from "./AddNew.module.css";
import ProductService from "../../services/ProductsService";
import { useNavigate } from "react-router-dom";

export default function AddNew({ toggleAdding }) {
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);
	const [product, setProduct] = useState({
		name: "",
		description: "",
		brand: "",
		imagesUrl: [],
		thumbnail: "",
		price: 0,
		stock: 0,
	});

	async function addProduct() {
		try {
			const response = await pService.addData(product);
			if (response) {
				window.location.reload(false);
			}
		} catch (error) {
			console.error(error);
		}
	}
	function handleChange(e) {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.wrapper}>
				<button
					className={Styles.closeBtn}
					onClick={toggleAdding}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
				<form action="">
					<h3 className={Styles.header}>Create new product</h3>
					<hr />
					<div className={Styles.inputs}>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="name"
							onChange={handleChange}
						/>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="10"
							placeholder="description"
							onChange={handleChange}
						></textarea>
						<input
							type="text"
							id="brand"
							name="brand"
							placeholder="brand"
							onChange={handleChange}
						/>

						<input
							type="url"
							id="price"
							placeholder="imagenes"
							name="imagesUrl"
							onChange={handleChange}
						/>
						<input
							type="url"
							id="thumbnail"
							name="thumbnail"
							placeholder="thumbnail url"
							onChange={handleChange}
						/>

						<input
							type="number"
							id="price"
							name="price"
							placeholder="price"
							onChange={handleChange}
							step="any"
							min={0}
						/>
						<input
							type="number"
							id="stock"
							placeholder="Stock"
							name="stock"
							onChange={handleChange}
							min={0}
						/>
					</div>
					<div className={Styles.buttons}>
						<button
							type="button"
							onClick={addProduct}
						>
							add product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
