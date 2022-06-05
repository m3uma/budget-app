import { createRouter, createWebHistory } from 'vue-router';
import { Categories, Expenses, Login, SignUp, ErrorPage } from '@/views';
import { useFirestore } from '@/stores/useFirestore';

const AUTH_PATHS = ['Categories', 'Expenses', 'NotFound'];
const UNAUTH_PATHS = ['Login', 'SignUp'];

function checkIfUserIsAuthenicated(to, _, next) {
  const piniaFire = useFirestore();
  if (!piniaFire.user && !UNAUTH_PATHS.includes(to.name)) return next({ name: 'Login' });
  else if (piniaFire.user && !AUTH_PATHS.includes(to.name)) return next({ name: 'Categories' });
  else next();
}

const routes = [
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    beforeEnter: [checkIfUserIsAuthenicated],
  },
  {
    path: '/expenses/:category?',
    name: 'Expenses',
    component: Expenses,
    beforeEnter: [checkIfUserIsAuthenicated],
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: [checkIfUserIsAuthenicated],
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: [checkIfUserIsAuthenicated],
  },
  {
    path: '/',
    redirect: '/categories',
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: ErrorPage,
    beforeEnter: [checkIfUserIsAuthenicated],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
