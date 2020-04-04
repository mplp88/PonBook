import VueRouter from 'vue-router'
import store from './store'
import Index from './components/Index'
import Login from './components/Users/Login'
import Logout from './components/Users/Logout'
import Register from './components/Users/Register'
import MyAccount from './components/Users/MyAccount'
import UpdatePassword from './components/Users/UpdatePassword'

const routes = [{
    name: 'Index',
    path: '/',
    component: Index
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Logout',
    path: '/logout',
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'MyAccount',
    path: '/myAccount',
    component: MyAccount,
    meta: { 
      requiresAuth: true
    }
  },
  {
    name: 'UpdatePassword',
    path: '/updatePassword',
    component: UpdatePassword,
    meta: { 
      requiresAuth: true
    }
  }
]

let router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'Login' })
    }
  }
  next();
})

export default router;