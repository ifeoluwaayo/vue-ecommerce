<!-- eslint-disable no-mixed-spaces-and-tabs -->
<script>
// import data from "@/data.json";

import axios from "axios";

export default {
	methods: {
		async fetchRate() {
			const response = await axios.get(
				"https://api.exchangerate.host/convert?from=USD&to=NGN"
			);
			const result = response.data.result;
			this.rate = result;
			console.log(this.rate);
			return this.rate;
		},

		addToCart(product) {
			this.$store.dispatch("addProductToCart", product);
			console.log(product);
		},
	},

	computed: {
		products() {
			return this.$store.getters.availableProducts;
		},
		newRate() {
			return this.rate;
		},
	},

	async mounted() {
		await this.fetchRate();
		this.$store.dispatch("fetchProducts");
		console.log(this.products);

		console.log(this.newRate);
	},

	render() {
		return (
			<div class="flex flex-col items-center w-full min-h-[88.4vh]">
				<h1 class="text-gray-800 font-[500] text-3xl mt-4">
					Our Products 🛒
				</h1>

				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-col-5 lg:gap-6 mt-6">
					{this.products.map((product) => {
						return (
							<div class="flex flex-col bg-slate-50 gap-2 shadow-md border border-gray-100 rounded-md pb-4 hover:scale-95 transition-all ease-in-out duration-150">
								<img
									src={product.image.src}
									alt={product.image.alt}
									class="w-[210px] h-[150px] rounded-t-md"
								/>
								<div class="flex flex-col items-center justify-center">
									<h3 class="text-gray-800 font-[400] text-2xl">
										{product.name}
									</h3>
									<div class="flex gap-2 items-center justify-center">
										<p class="text-gray-500 font-[400] text-sm">
											1 in {product.quantity} for:
										</p>
										<p class="text-gray-900 font-[500] text-lg">
											₦
											{(
												product.price * (this.rate || 1)
											).toLocaleString()}
										</p>
									</div>
									<button
										class="bg-blue-500 hover:bg-blue-700 mt-1 text-white w-[120px] font-[500] py-2 px-4 rounded-lg"
										onClick={() => this.addToCart(product)}>
										Add to Cart
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
};
</script>
