import React, { useEffect, useState } from "react";
import style from "./ProductCard.module.css";

export default function Card({ products, select }) {
	// Definimos el número máximo de elementos por página
	const maxItemPerPage = 8;
	// Calculamos el número total de páginas según la cantidad de productos
	const totalPages = Math.ceil(products.length / maxItemPerPage);
	// Definimos el estado actual de la página
	const [currentPage, setCurrentPage] = useState(1);
	// Calculamos los elementos a mostrar en la página actual
	const itemToShow = products.slice(
		(currentPage - 1) * maxItemPerPage,
		currentPage * maxItemPerPage
	);

	useEffect(() => {
		// Establecemos la página actual como 1 cuando el componente se monta o se recarga
		setCurrentPage(1);
	}, [products]);

	function selectProduct(product) {
		// Si hay una función de selección definida, la llamamos con el producto seleccionado
		if (select) {
			select(product);
		}
	}

	return (
		<>
			<div className={style.products}>
				<div className={style.productsList}>
					{itemToShow.map((product, i) => {
						return (
							<div
								key={product.id}
								id={product.id}
								className={style.card}
								onClick={() => selectProduct(product)}
							>
								<div className={style.image}>
									{product.thumbnail ? (
										<img
											src={product.thumbnail}
											alt=""
										/>
									) : (
										<h1>No image Available</h1>
									)}
								</div>
								<div className={style.body}>
									<div className={style.brandTitle}>
										<h5>{product.name}</h5>
										<small>{product.brand}</small>
									</div>
									<p className={style.description}>{product.description}</p>
									<h3 className={style.price}>
										<p>
											<span>$</span>
											{product.price}
										</p>
									</h3>

									<small className={style.stock}>
										In stock ({product.stock} available)
									</small>
								</div>
							</div>
						);
					})}
				</div>
				<div className={style.navigation}>
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<i className="fa-solid fa-chevron-left"></i>
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<i className="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</div>
		</>
	);
}
