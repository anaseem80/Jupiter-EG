import {createRouter, createWebHistory} from 'vue-router';
import Login from '@/views/pages/Auth/login'
import Home from '@/views/pages/Home/index'
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
];
export const router = createRouter({
    history: createWebHistory('/ecommerce'),
    linkActiveClass: 'active',
    routes,
});

