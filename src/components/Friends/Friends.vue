<template>
  <div>
    <h1>Mis Amigos</h1>
    <div v-if="friends.length">
      <div v-for="friend in friends" :key="friend._id">
        friend.username
      </div>
    </div>
    <div v-else>
      <h3>Todavía no tenés amigos :(.</h3>
      <p>¡Vamos a encontrarte algunos!</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      friends: []
    }
  }
}
</script>

<style>

</style>