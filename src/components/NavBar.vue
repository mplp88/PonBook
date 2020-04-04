<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/">Pon-Site</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home <!--span class="sr-only">(current)</span--></router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="!isLoggedIn" class="nav-link" to="/login">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="!isLoggedIn" class="nav-link" to="/register">Registrarse</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="isLoggedIn" class="nav-link" to="/myAccount">Mi Cuenta</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="isLoggedIn" class="nav-link" to="/logout">Salir</router-link>
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
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style>

</style>