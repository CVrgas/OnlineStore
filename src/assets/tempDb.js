async function getProducts() {
	// https://fakestoreapi.com/products
	try {
		const response = await fetch("https://fakestoreapi.com/products");
		// .then((res) => res.json())
		// .then((json) => console.log(json));
		if (response.ok) {
			return response;
		} else {
			throw new Error("Request failed with status: " + response.status);
		}
	} catch (error) {
		console.log(error.message);
		return null;
	}
}
export default getProducts;
