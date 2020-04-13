<template>
  <div class="container">
    <h1>Bucar amigos</h1>
    <input class="form-control" v-model="query" placeholder="Escriba aquí para buscar amigos" />
    <p v-if="loading">Buscando...</p>
    <div>
      <div v-for="result in results" :key="result._id">{{ result.username }}</div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
export default {
  data: function() {
    return {
      query: "",
      loading: false,
      results: []
    };
  },
  methods: {
    findFriends: function() {
      let vm = this;
      vm.loading = true;
      fetch(`http://localhost:8081/api/users/find/${vm.query}`)
        .then(res => res.json())
        .then(json => {
          vm.loading = false;
          if (!json.ok) {
            swal("Error!", "Ocurrió un error durante la busqueda", "error");
            console.error(json.error);
          } else {
            vm.results = json.results;
          }
        });
    }
  },
  watch: {
    query: function(newValue) {
      console.log(newValue);
      if (newValue.length > 2) {
        this.findFriends();
      } else {
        this.results = [{ _id: -1, username: "Ingrese al menos 3 letras" }];
      }
    }
  }
};
</script>

<style>
</style>