<template>
  <div class="container">
    <h2>Ingresar a la pagina</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <input
          class="form-control"
          id="username"
          name="username"
          v-model="user.username"
          type="text"
          placeholder="Usuario"
        />
      </div>
      <div class="form-group">
        <input
          class="form-control"
          id="password"
          name="password"
          v-model="user.password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <input class="btn btn-primary" type="submit" value="Ingresar" />
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login: function () {
      let vm = this;

      swal.fire({
        icon: "info",
        text: "Por favor, espere.",
        title: "Ingresando!",
        onBeforeOpen: () => {
          swal.showLoading();
          fetch("/api/account/login", {
            method: "POST",
            body: JSON.stringify(vm.user),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((json) => {
              if (json._id) {
                swal.fire({
                  icon: "success",
                  title: `Bienvenido ${vm.user.username}`,
                  timer: 1500,
                  timerProgressBar: true,
                });

                vm.$store.dispatch("login", json);
                vm.$router.push("/myAccount");
              } else {
                swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Credenciales incorrectas",
                });
              }
            })
            .catch((err) => {
              swal("Error", "Error", "error");
              console.error(err);
            });
        },
      });
    },
  },
  mounted: function () {
    document.getElementById("username").focus();
  },
};
</script>

<style>
</style>