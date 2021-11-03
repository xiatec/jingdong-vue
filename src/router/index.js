import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
}, {
  path: '/shop/:id',
  name: 'Shop',
  component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
}, {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
  beforeEnter(to, from, next) {
    const { isLogin } = localStorage;
    isLogin ? next({ name: 'Home' }) : next();
  }
}, {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
  beforeEnter(to, from, next) {
    const { isLogin } = localStorage;
    isLogin ? next({ name: 'Home' }) : next();
  }
  },
  {
    path: '/cartList',
    name: 'cartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/cartList')
  },
  {
    path: '/orderconfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderconfirmation" */ '../views/orderconfirmation/OrderConfirmation')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === "Login" || name === "Register");
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' });
})

export default router
