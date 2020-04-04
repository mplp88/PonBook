import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    user: {}
  },

  mutations: {
    setUser(state, user) {
        state.user = user;
    },
    logout(state) {
        state.user = {};
    }
  },

  actions: {
    setUser(context, user) {
      context.commit('setUser', user);
    },
    login(context, user) {
        context.dispatch('setUser', user);
    },
    logout(context) {
        context.commit('logout');
    }
  },

  getters: {
    isLoggedIn(state) {
        return state.user._id
    },
    user(state) {
        return state.user
    }
  }
})

export default store