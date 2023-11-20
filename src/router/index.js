import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/pages/Auth/login'
import Home from '@/views/pages/Home/index'
import Products from '@/views/pages/Products/Products'
import OrderDetails from '@/views/pages/Order/order-details'
import CheckOut from '@/views/pages/Order/checkout'
import Cart from '@/views/pages/Cart/cart'
import Wishlist from '@/views/pages/wishlist/wishlist'
import Product from '@/views/pages/Product/product'
import SidePage from '@/views/pages/SidePages/side-pages'
import Games from '@/views/pages/Games/games'
import Error from '@/views/pages/404/404'
import Contact from '@/views/pages/Contact/contact'
import Profile from '@/views/pages/Profile/profile'
import ThankYou from '@/views/pages/Order/thank-you'
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
    path: '/order-success',
    name: 'order-success',
    component: ThankYou
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
    path: '/wishlist',
    name: 'wishlist',
    component: Wishlist
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
    path: "/contact",
    name: "contact",
    component: Contact,
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
    path: "/terms",
    name: "Terms & Conditions",
    component: SidePage,
    props: route => ({ apiEndpoint: "terms" })
  },
  {
    path: "/about",
    name: "About Us",
    component: SidePage,
    props: route => ({ apiEndpoint: "about" })
  },
  {
    path: "/privacy",
    name: "Privacy and policy",
    component: SidePage,
    props: route => ({ apiEndpoint: "privacy" })
  },
  {
    path: "/return-policy",
    name: "Return Policy",
    component: SidePage,
    props: route => ({ apiEndpoint: "return-policy" })
  },
  {
    path: "/store-policy",
    name: "Store Policy",
    component: SidePage,
    props: route => ({ apiEndpoint: "store-policy" })
  },
  {
    path: "/seller-policy",
    name: "Seller Policy",
    component: SidePage,
    props: route => ({ apiEndpoint: "seller-policy" })
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

