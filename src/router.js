import VueRouter from 'vue-router'
import store from './store'
import Index from './components/Index'
import Login from './components/Users/Login'
import Logout from './components/Users/Logout'
import Register from './components/Users/Register'
import MyAccount from './components/Users/MyAccount'
import ChangePassword from './components/Users/ChangePassword'
import Friends from './components/Friends/Friends'
import FindFriends from './components/Friends/FindFriends'

const routes = [{
    name: 'Index',
    path: '/',
    component: Index,
    meta: {
      title: 'Home'
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      title: 'Ingresar'
    }
  },
  {
    name: 'Logout',
    path: '/logout',
    component: Logout,
    meta: {
      title: 'Salir',
      requiresAuth: true
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: {
      title: 'Registrar'
    }
  },
  {
    name: 'MyAccount',
    path: '/myAccount',
    component: MyAccount,
    meta: {
      title: 'Mi Cuenta',
      requiresAuth: true
    }
  },
  {
    name: 'ChangePassword',
    path: '/changePassword',
    component: ChangePassword,
    meta: {
      title: 'Cambiar Password',
      requiresAuth: true
    }
  },
  {
    name: 'Friends',
    path: '/friends',
    component: Friends,
    meta: {
      title: 'Amigos',
      requiresAuth: true
    }
  },
  {
    name: 'FindFriends',
    path: '/findFriends',
    component: FindFriends,
    meta: {
      title: 'Buscar Amigos',
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
      next({
        name: 'Login'
      })
    }
  }
  document.title = to.meta.title
  next();
})

export default router;