import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Market from "../views/Market.vue";
import Influencer from "../views/Influencer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/market",
    name: "Market",
    component: Market
  },
  {
    path: "/influencer",
    name: "Influencer",
    component: Influencer
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
