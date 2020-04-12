<template>
  <div>
    <h1>Mis Amigos</h1>
    <div v-if="friends.length">
      <router-link to="/findFriends">Buscar amigos</router-link>
      <div v-for="friend in friends" :key="friend.id">
        friend.username
        <span v-if="!friend.accepted">(pendiente)</span>
      </div>
    </div>
    <div v-else>
      <h3>Todavía no tenés amigos :(.</h3>
      <router-link to="/findFriends">¡Vamos a encontrarte algunos!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  computed: {
    friends: function() {
      return this.$store.getters.friends || [];
    }
  }
};
</script>

<style>
</style>