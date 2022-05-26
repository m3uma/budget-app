import { createRouter, createWebHistory } from 'vue-router';
import { Categories, Expenses, Login, SignUp, ErrorPage } from '../views';

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/expenses/:category?',
    name: 'Expenses',
    component: Expenses,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/',
    redirect: '/categories',
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: ErrorPage,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
