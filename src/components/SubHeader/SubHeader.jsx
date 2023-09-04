import React, { useState } from "react";
import styles from "./SubHeader.module.css";

export default function SubHeader({ setSearchQuery, search }) {
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
			<h1>Product List</h1>
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
					Search
				</button>
			</div>
			<button className={styles.addButton}>Add New Product</button>
		</div>
	);
}
