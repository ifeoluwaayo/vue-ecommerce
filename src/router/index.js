import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/cart",
		name: "cart",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/CartView.vue"),
	},
	{
		path: "/product/:name",
		name: "product",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/ProductView.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
