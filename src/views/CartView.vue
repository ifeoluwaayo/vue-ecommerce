<template>
	<div>
		<div class="flex items-center justify center w-full flex-col">
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
									₦{{ product.price }}
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
									₦{{ product.price * product.quantity }}
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
				<p class="bg-washed-red pv3 ph2 br2">No item in your cart!</p>
			</div>
			<div class="tl mw8 center w-100">
				<div v-if="products.length > 0" class="">
					<p class="f4">
						<span class="green fw6 mr2">Total:</span>₦{{
							total.toFixed(2)
						}}
					</p>
					<button
						class="bg-washed-red bn br2 pv2 ph3 w-100 w5-ns red di-ns db mr3 link"
						@click="removeCartProducts()"
					>
						<i class="fas fa-trash"></i> Checkout ({{ cartNumber }})
					</button>
				</div>
				<router-link
					to="/"
					class="link bg-green mt3 pv2 ph3 bn br2 white tc db dib-ns"
					><i class="fas fa-space-shuttle mr2"></i>Continue
					Shopping</router-link
				>
			</div>
		</div>
	</div>
</template>
<script>
import router from "@/router";

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
	},
	methods: {
		removeProduct(product) {
			this.$store.dispatch("removeProduct", product);
		},
		removeCartProducts() {
			this.$store.dispatch("removeCartProducts").then(router.push("/"));
		},
	},
};
</script>
