import React, { useEffect, useState } from "react";
import Styles from "./ProductCard.module.css";
import SubHeader from "../SubHeader/SubHeader";

export default function Card({
	products,
	select,
	setSearchQuery,
	searchProduct,
}) {
	const maxItemPerPage = 8;
	const totalPages = Math.ceil(products.length / maxItemPerPage);
	const [currentPage, setCurrentPage] = useState(1);
	const itemToShow = products.slice(
		(currentPage - 1) * maxItemPerPage,
		currentPage * maxItemPerPage
	);
	useEffect(() => {
		setCurrentPage(1); // Set currentPage to 1 when the component mounts or reloads
	}, [products]);

	return (
		<>
			<SubHeader
				setSearchQuery={setSearchQuery}
				search={searchProduct}
			></SubHeader>

			<div className={Styles.products}>
				<div className={Styles.productsList}>
					{itemToShow.map((product, i) => {
						return (
							<div
								key={product.id}
								className={Styles.card}
								onClick={() => select(product)}
							>
								<div className={Styles.image}>
									{product.thumbnail ? (
										<img
											src={product.thumbnail}
											alt=""
										/>
									) : (
										<h1>No image Available</h1>
									)}
								</div>
								<div className={Styles.body}>
									<div className={Styles.brandTitle}>
										<h5>{product.name}</h5>
										<small>{product.brand}</small>
									</div>
									<p className={Styles.description}>{product.description}</p>
									<h3 className={Styles.price}>
										<p>
											<span>$</span>
											{product.price}
										</p>
									</h3>

									<small className={Styles.stock}>
										In stock ({product.stock} available)
									</small>
								</div>
							</div>
						);
					})}
				</div>
				<div className={Styles.navigation}>
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<i class="fa-solid fa-chevron-left"></i>
					</button>
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						<i class="fa-solid fa-chevron-right"></i>
					</button>
				</div>
			</div>
		</>
	);
}
