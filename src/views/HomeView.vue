<template>
	<div class="flex flex-col items-center w-full min-h-[88.4vh]">
		<h1 class="text-gray-800 font-[500] text-3xl mt-4">Our Products 🛒</h1>

		<div
			class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-col-5 lg:gap-6 mt-6 px-5"
		>
			<div
				class="flex flex-col bg-slate-50 gap-2 shadow-md border border-gray-100 rounded-md pb-4 hover:scale-95 transition-all ease-in-out duration-150"
				v-for="product in products"
				:key="product.name"
			>
				<img
					:src="product.image.src"
					:alt="product.image.alt"
					class="w-[210px] h-[150px] rounded-t-md"
				/>
				<div class="flex flex-col items-center justify-center">
					<h3 class="text-gray-800 font-[400] text-2xl">
						{{ product.name }}
					</h3>
					<div class="flex gap-2 items-center justify-center">
						<p class="text-gray-500 font-[400] text-sm">
							1 in {{ product.quantity }} for:
						</p>
						<p class="text-gray-900 font-[500] text-lg">
							₦
							{{
								(product.price * (rate || 1))
									.toFixed(2)
									.replace(/\d(?=(\d{3})+\.)/g, "$&,")
							}}
						</p>
					</div>
					<button
						class="bg-blue-500 hover:bg-blue-700 mt-1 text-white w-[120px] font-[500] py-2 px-4 rounded-lg"
						@click="addToCart(product)"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "HomeView",
	methods: {
		async fetchRate() {
			const response = await axios.get(
				"https://api.exchangerate.host/convert?from=USD&to=NGN"
			);
			const result = response.data.result;
			this.rate = result;
			return this.rate;
		},

		addToCart(product) {
			this.$store.dispatch("addProductToCart", product);
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

	data() {
		return {
			rate: null,
		};
	},

	async mounted() {
		await this.fetchRate();
		this.$store.dispatch("fetchProducts");
	},
};
</script>
