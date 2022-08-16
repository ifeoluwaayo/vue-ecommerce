<script>
export default {
	computed: {
		cartItems() {
			return this.$store.getters.cartIteming;
		},
	},

	render() {
		return (
			<div class="flex flex-col gap-3 overflow-x-hidden">
				<nav class="flex items-center justify-between px-4 bg-gray-50 w-full py-4 border-b border-gray-200 fixed shadow-md z-10">
					<h1 class="text-4xl font-bold italic">Ayo's Store</h1>
					<ul class="flex gap-4">
						<li class="cursor-pointer text-lg text-gray-900 font-[400]">
							<router-link to="/">Home</router-link>
						</li>
						<li class="cursor-pointer text-lg text-gray-900 font-[400]">
							<router-link to="/cart">Cart</router-link>
						</li>
					</ul>

					<p class="text-base text-gray-500 md:block hidden">
						{this.cartItems || 0} items in cart
					</p>
				</nav>

				<div class="pt-[80px]">
					<router-view />
				</div>
			</div>
		);
	},
};
</script>
