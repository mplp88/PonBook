<template>
  <div>
    <h2>Saliendo...</h2>
    <h4>¡Te esperamos de vuelta pronto!</h4>
  </div>
</template>

<script>
export default {
  mounted: function() {
    let vm = this;
    setTimeout(() => {
        vm.$store.dispatch('logout');
        vm.$router.push('/');
    }, 1000)
  }
}
</script>

<style>

</style>