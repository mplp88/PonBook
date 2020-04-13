<template>
  <div>
    <h2>Saliendo...</h2>
    <h4>¡Te esperamos de vuelta pronto!</h4>
    <h6>(Te estamos redirigiendo al inicio en {{ timeLeft }} {{ timeLeft > 1 ? 'segundos' : 'segundo' }})</h6>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      timeout: 5000
    };
  },
  computed: {
    timeLeft: function() {
      return this.timeout / 1000;
    }
  },
  mounted: function() {
    let vm = this;
    vm.$store.dispatch("logout");

    setTimeout(() => {
      vm.$router.push("/");
    }, vm.timeout);

    let interval = setInterval(() => {
      vm.timeout -= 1000;
      if (!vm.timeout) clearInterval(interval);
    }, 1000);
  }
};
</script>

<style>
</style>