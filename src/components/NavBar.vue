<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/">PonBook</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: isActive}" to="/">Home <span v-if="isActive" class="sr-only">(current)</span></router-link>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" id="navbar-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cuenta</a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-dropdown">
          <router-link v-if="!isLoggedIn" class="dropdown-item" v-bind:activeClass="active" to="/login">Login <span v-if="isActive" class="sr-only">(current)</span></router-link>
          <router-link v-if="!isLoggedIn" class="dropdown-item" :class="{ active: isActive}" to="/register">Registrarse <span v-if="isActive" class="sr-only">(current)</span></router-link>
          <router-link v-if="isLoggedIn" class="dropdown-item" :class="{ active: isActive}" to="/myAccount">Mi Cuenta <span v-if="isActive" class="sr-only">(current)</span></router-link>
          <router-link v-if="isLoggedIn" class="dropdown-item" :class="{ active: isActive}" to="/logout">Salir <span v-if="isActive" class="sr-only">(current)</span></router-link>
        </div>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
//TODO: arreglar el estilo del active y el sr-only current
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>

<style>
</style>