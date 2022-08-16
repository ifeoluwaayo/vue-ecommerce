<template>
	<div>
		<div class="flex items-center justify center w-full flex-col p-3">
			<h1 class="text-gray-800 font-[500] text-3xl mt-4">Your Cart</h1>
			<div class="overflow-auto">
				<table class="w-full my-3" cellspacing="0">
					<thead>
						<tr class="stripe-dark">
							<th
								class="text-gray-800 font-[400] text-2xl w-[200px]"
							>
								Product
							</th>
							<th
								class="text-gray-800 font-[400] text-2xl w-[200px]"
							>
								Price
							</th>
							<th
								class="text-gray-800 font-[400] text-2xl w-[200px]"
							>
								Quantity
							</th>
							<th
								class="text-gray-800 font-[400] text-2xl w-[200px]"
							>
								Total
							</th>
						</tr>
					</thead>
					<tbody class="gap-5">
						<tr
							class="border-b border-gray-200 hover:bg-gray-100 h-[60px] shadow"
							v-for="product in products"
							:key="product.id"
						>
							<td class="">
								<div class="flex items-center justify-center">
									{{ product.title }}
								</div>
							</td>
							<td class="">
								<div class="flex items-center justify-center">
									₦{{
										(product.price * (rate || 1))
											.toFixed(2)
											.replace(/\d(?=(\d{3})+\.)/g, "$&,")
									}}
								</div>
							</td>

							<td class="">
								<div class="flex items-center justify-center">
									<input
										v-model.number="product.quantity"
										min="1"
										:max="product.newQuantityInStock"
										type="number"
										id="quantity"
										class="bg-transparent border-0"
									/>
								</div>
							</td>
							<td class="">
								<div class="flex items-center justify-center">
									₦{{
										(
											product.price *
											product.quantity *
											(rate || 1)
										)
											.toFixed(2)
											.replace(/\d(?=(\d{3})+\.)/g, "$&,")
									}}
								</div>
							</td>
							<td class="">
								<div class="flex items-center justify-center">
									<p
										@click="removeProduct(product)"
										id="delete-item"
										class="fas fa-trash-alt text-red-500 cursor-pointer"
									>
										remove
									</p>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="!products.length">
				<p class="">No item in your cart!</p>
			</div>
			<div class="tl mw8 center w-100">
				<div
					v-if="products.length > 0"
					class="mb-2 flex flex-col items-center justify-center"
				>
					<p class="font-bold text-lg text-black">
						<span class="text-blue-500 text-sm font-[500]"
							>Total: </span
						>₦{{
							(total.toFixed(2) * (rate || 1))
								.toFixed(2)
								.replace(/\d(?=(\d{3})+\.)/g, "$&,")
						}}
					</p>
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
						@click="removeCartProducts()"
					>
						🛒 Checkout ({{ cartNumber }})
					</button>
				</div>
				<router-link
					to="/"
					class="text-blue-500 text-sm font-[500] flex items-center justify-center"
					><i class=""></i>Continue Shopping</router-link
				>
			</div>
			<div class="mt-2">
				<MapComponent />
			</div>
		</div>
	</div>
</template>
<script>
import router from "@/router";
import axios from "axios";
import MapComponent from "@/components/MapComponent.vue";

export default {
	name: "cartView",
	computed: {
		products() {
			return this.$store.getters.cartProducts;
		},
		total() {
			return this.$store.getters.cartTotal;
		},
		cartNumber() {
			return this.$store.getters.cartIteming;
		},
		newRate() {
			return this.rate;
		},
	},
	methods: {
		removeProduct(product) {
			this.$store.dispatch("removeProduct", product);
		},
		removeCartProducts() {
			this.$store.dispatch("removeCartProducts").then(router.push("/"));
		},
		async fetchRate() {
			const response = await axios.get(
				"https://api.exchangerate.host/convert?from=USD&to=NGN"
			);
			const result = response.data.result;
			this.rate = result;
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
	},
	components: { MapComponent },
};
</script>
