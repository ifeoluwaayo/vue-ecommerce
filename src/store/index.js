//import Vue and dependencies here
import Vue from "vue";
import Vuex from "vuex";
import data from "@/data.json";
// import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		products: data,
		cart: JSON.parse(localStorage.getItem("cart")) || [],
	},
	getters: {
		availableProducts(state) {
			return state.products;
		},

		cartProducts(state) {
			return state.cart;
		},
		cartTotal(state, getters) {
			return getters.cartProducts.reduce(
				(total, product) => total + product.price * product.quantity,
				0
			);
		},
		cartIteming(state) {
			return state.cart.length;
		},
	},
	actions: {
		addProductToCart(context, product) {
			if (product.quantity > 0) {
				const cartItem = context.state.cart.find(
					(item) => item.name === product.name
				);
				if (!cartItem) {
					context.commit("pushProductToCart", product);
					localStorage.setItem(
						"cart",
						JSON.stringify(context.state.cart)
					);
				} else {
					context.commit("incrementItemQuantity", cartItem);
					localStorage.setItem(
						"cart",
						JSON.stringify(context.state.cart)
					);
				}
			}
		},
		removeProduct(context, product) {
			context.commit("popProductFromCart", product.name);
			context.commit("incrementProductInventory", product);
			localStorage.setItem("cart", JSON.stringify(context.state.cart));
		},
		removeCartProducts(context) {
			context.commit("removeAllProducts");
		},

		fetchProducts({ commit }) {
			commit("setProducts", data);
		},
	},
	mutations: {
		pushProductToCart(state, product) {
			state.cart.push({
				quantity: 1,
				title: product.name,
				price: product.price,
				productPrice: product.price,
				newQuantityInStock: product.quantity,
			});
		},
		popProductFromCart(state) {
			state.cart.pop();
		},
		removeAllProducts(state) {
			state.cart = [];
		},
		incrementProductInventory(state, product) {
			product.quantity--;
		},
		incrementItemQuantity(state, cartItem) {
			const product = state.products.find(
				(product) => product.name === cartItem.name
			);
			cartItem.quantity++;
			product.quantity--;
			cartItem.productPrice = cartItem.quantity * product.price;
		},
		setProducts(state, products) {
			state.products = products;
		},
	},
});
