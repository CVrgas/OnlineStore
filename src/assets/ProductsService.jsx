let products = [
	{
		id: 1,
		name: "Samsung Smart Tv",
		description: '40" smart tv ',
		price: 1000,
		stock: 12,
	},
];

export class ProductService {
	static async getProduct({ id }) {
		if (id) {
			return products.find((product) => product.id == id);
		}
		return products;
	}
	static async createProduct(newProduct) {
		return products.push(newProduct);
	}
	static async updateProduct({ id, updated }) {
		const index = products.findIndex((item) => item.id == id);
		if (index === -1) {
			return;
		}
		products[index] = {
			...products[index],
			...updated,
		};
	}
	static async delete({ id }) {
		const index = products.findIndex((item) => item.id == id);
		if (index === -1) {
			return;
		}
		products.slice(index, 1);
	}
}
