import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/pages/Auth/login'
import Home from '@/views/pages/Home/index'
import Products from '@/views/pages/Products/Products'
import OrderDetails from '@/views/pages/Order/order-details'
import CheckOut from '@/views/pages/Order/checkout'
import Cart from '@/views/pages/Cart/cart'
import Product from '@/views/pages/Product/product'
import Games from '@/views/pages/Games/games'
import Error from '@/views/pages/404/404'
import Profile from '@/views/pages/Profile/profile'
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
    path: "/:pathMatch(.*)*",
    name: "404",
    component: Error,
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
    path: '/profile',
    name: 'profile',
    component: Profile
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
    path: "/order/:id",
    name: "order",
    component: OrderDetails,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckOut,
  },
  {
    path: "/last",
    name: "Last Products",
    component: Products,
    props: route => ({ apiEndpoint: "products/last" })
  },
  {
    path: "/hotItems",
    name: "Hot Items",
    component: Products,
    props: route => ({ apiEndpoint: "products/hotitem" })
  },
  {
    path: "/search-product/:keyword",
    name: "Search",
    component: Products,
    props: route => ({ apiEndpoint: "search-product" })
  },
  {
    path: "/toprate",
    name: "Top rate products",
    component: Products,
    props: route => ({ apiEndpoint: "products/toprate" })
  },
  {
    path: "/with-offers",
    name: "Products Offers",
    component: Products,
    props: route => ({ apiEndpoint: "products/with-offers" })
  },
  {
    path: "/subCategory/:id",
    name: "Sub category",
    component: Products,
    props: route => ({ apiEndpoint: `subcategories/${route.params.id}/products` })
  }
];
export const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    routes,
});

