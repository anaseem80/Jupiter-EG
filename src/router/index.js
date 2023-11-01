import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/pages/Auth/login'
import Home from '@/views/pages/Home/index'
import Products from '@/views/pages/Products/Products'
import Cart from '@/views/pages/Cart/cart'
import Product from '@/views/pages/Product/product'
import Games from '@/views/pages/Games/games'
import Register from '@/views/pages/Auth/register'
import Verification from '@/views/pages/Auth/verification'
import ForgetPassword from '@/views/pages/Auth/forget_password'
import ResetPassword from '@/views/pages/Auth/reset_password'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/verification',
    name: 'verification',
    component: Verification
  },
  {
    path: '/forget_password',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/reset_password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/games',
    name: 'games',
    component: Games
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/last",
    name: "last",
    component: Products,
    props: route => ({ apiEndpoint: "products/last" })
  },
  {
    path: "/hotItems",
    name: "hotItems",
    component: Products,
    props: route => ({ apiEndpoint: "products/hotitem" })
  },
  {
    path: "/toprate",
    name: "toprate",
    component: Products,
    props: route => ({ apiEndpoint: "products/toprate" })
  },
  {
    path: "/with-offers",
    name: "with-offers",
    component: Products,
    props: route => ({ apiEndpoint: "products/with-offers" })
  },
  {
    path: "/subCategory/:id",
    name: "subCategory",
    component: Products,
    props: route => ({ apiEndpoint: `subcategories/${route.params.id}/products` })
  }
];
export const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    routes,
});

