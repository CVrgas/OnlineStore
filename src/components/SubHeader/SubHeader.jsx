import React, { useState } from "react";
import styles from "./SubHeader.module.css";

export default function SubHeader({ setSearchQuery, search, toggleAdding }) {
	const [input, setInput] = useState("");

	function handleChange(e) {
		const searchQuery = e.target.value;
		if (searchQuery.trim() === "") {
			search();
		}
		setSearchQuery(searchQuery);
	}

	return (
		<div className={styles.SearchContainer}>
			<div></div>
			<div className={styles.searchBar}>
				<input
					type="text"
					placeholder="Search products..."
					onChange={handleChange}
				/>
				<button
					className={styles.searchButton}
					onClick={search}
				>
					<i className="fa-solid fa-magnifying-glass"></i>
				</button>
			</div>
			<button
				className={styles.addButton}
				onClick={toggleAdding}
			>
				<i className="fa-solid fa-plus"></i> New Product
			</button>
		</div>
	);
}
