import React, { useState } from "react";
import Styles from "./EditCard.module.css";
import ProductService from "../../assets/ProductsService";


export default function EditCard({ productToEdit, toggleToEdit }) {
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);
	const [product, setProduct] = useState(productToEdit);

	async function editProduct() {
		try {
			const response = await pService.updateData(productToEdit.id, product);
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
					onClick={() => toggleToEdit("")}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
				<form action="">
					<h3 className={Styles.header}>Editing product</h3>
					<hr />
					<div className={Styles.inputs}>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="name"
							required
							value={product.name}
							onChange={handleChange}
						/>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="10"
							value={product.description}
							required
							placeholder="description"
							onChange={handleChange}
						></textarea>
						<input
							type="text"
							id="brand"
							name="brand"
							value={product.brand}
							required
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
							value={product.thumbnail}
							required
							onChange={handleChange}
						/>

						<input
							type="number"
							id="price"
							name="price"
							placeholder="price"
							value={product.price}
							onChange={handleChange}
							required
							step="any"
							min={0}
						/>
						<input
							type="number"
							id="stock"
							placeholder="Stock"
							name="stock"
							value={product.stock}
							required
							onChange={handleChange}
							min={0}
						/>
					</div>
					<div className={Styles.buttons}>
						<button
							type="button"
							onClick={editProduct}
						>
							Save changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
