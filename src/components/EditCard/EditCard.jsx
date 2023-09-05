import React, { useState } from "react";
import Styles from "./EditCard.module.css";
import ProductService from "../../services/ProductsService";

export default function EditCard({ productToEdit, toggleToEdit }) {
	// Creamos una instancia de la clase ProductService
	const productService = new ProductService(
		"https://localhost:7038/OnlineStore/api/product"
	);

	// Definimos el estado inicial del producto a editar
	const [product, setProduct] = useState(productToEdit);

	// Función asincrónica para editar el producto
	async function editProduct() {
		try {
			// Llamamos al método updateData del servicio ProductService
			const response = await productService.updateData(
				productToEdit.id,
				product
			);
			if (response) {
				// Recargamos la página si la respuesta es exitosa
				window.location.reload(false);
			}
		} catch (error) {
			console.error(error);
		}
	}

	// Función para manejar los cambios en los campos del formulario
	function handleChange(e) {
		// Actualizamos el estado del producto con los valores introducidos en los campos
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	// Componente de React para la interfaz de edición del producto
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
					<h3 className={Styles.header}>Editando producto</h3>
					<hr />
					<div className={Styles.inputs}>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="nombre"
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
							placeholder="descripción"
							onChange={handleChange}
						></textarea>
						<input
							type="text"
							id="brand"
							name="brand"
							value={product.brand}
							required
							placeholder="marca"
							onChange={handleChange}
						/>

						<input
							type="url"
							id="price"
							placeholder="imágenes"
							name="imagesUrl"
							onChange={handleChange}
						/>
						<input
							type="url"
							id="thumbnail"
							name="thumbnail"
							placeholder="URL de la miniatura"
							value={product.thumbnail}
							required
							onChange={handleChange}
						/>

						<input
							type="number"
							id="price"
							name="price"
							placeholder="precio"
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
							Guardar cambios
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
