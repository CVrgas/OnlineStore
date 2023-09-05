import React, { useState } from "react";
import Styles from "./AddNew.module.css";
import ProductService from "../../services/ProductsService";

export default function AddNew({ toggleAdding }) {
	// create una instancia de ProductService
	const pService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);

	//define el estado incial de la form
	const [product, setProduct] = useState({
		name: "",
		description: "",
		brand: "",
		imagesUrl: [],
		thumbnail: "",
		price: 0,
		stock: 0,
	});

	//funcion que agrega producto
	async function addProduct() {
		console.log("x");
		try {
			const response = await pService.addData(product);

			// valida si la respuesta existe y es correcta
			if (response) {
				window.location.reload(false); // recarga la pagina
			}
		} catch (error) {
			console.error(error);
		}
	}

	// funcion que maneja el cambio de valor y actualiza el producto
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
				<form>
					<h3 className={Styles.header}>Create new product</h3>
					<hr />
					<div className={Styles.inputs}>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="name"
							required
							onChange={handleChange}
						/>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="10"
							placeholder="description"
							required
							onChange={handleChange}
						></textarea>
						<input
							type="text"
							id="brand"
							name="brand"
							placeholder="brand"
							required
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
							required
							onChange={handleChange}
							step="any"
							min={0}
						/>
						<input
							type="number"
							id="stock"
							placeholder="Stock"
							required
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
