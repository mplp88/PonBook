<template>
  <div class="container">
    <h1>Cambio de contraseña</h1>
    <form @submit.prevent="changePassword">
      <div class="form-group">
        <input
          class="form-control"
          v-model="oldPassword"
          type="password"
          placeholder="Password anterior"
          :class="{
            'is-valid': wasValidated && oldPasswordValid,
            'is-invalid': wasValidated && !oldPasswordValid,
          }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">El password es obligatorio</div>
      </div>
      <div class="form-group">
        <input
          class="form-control"
          v-model="newPassword"
          type="password"
          placeholder="Password nuevo"
          :class="{
            'is-valid': wasValidated && newPasswordValid,
            'is-invalid': wasValidated && !newPasswordValid,
          }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">
          El password es obligatorio, debe contener al menos una letra
          minuscula, una letra mayuscula, un número y un caracter especial (!,
          @, #, $, %, ^, & o *) y ser distinto al anterior.
        </div>
      </div>
      <div class="form-group">
        <input
          class="form-control"
          v-model="repeatPassword"
          type="password"
          placeholder="Repetir Password"
          :class="{
            'is-valid': wasValidated && repeatPasswordValid,
            'is-invalid': wasValidated && !repeatPasswordValid,
          }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">Los passwords no coinciden.</div>
      </div>
      <div class="row mb-3">
        <div class="col-2 offset-3">
          <input
            class="btn btn-primary"
            type="submit"
            value="Cambiar Password"
          />
        </div>
        <div class="col-2 offset-2">
          <input
            class="btn btn-danger"
            type="buton"
            value="Cancelar"
            @click="cancel"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  data: function () {
    return {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      wasValidated: false,
    };
  },
  methods: {
    changePassword: function () {
      let vm = this;
      if (vm.validate()) {
        fetch(
          `/api/account/changePassword/${vm.$store.getters.user.username}`,
          {
            method: "POST",
            body: JSON.stringify({
              oldPassword: vm.oldPassword,
              newPassword: vm.newPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            if (json.ok) {
              vm.$store.dispatch("setUser", json.result);
              console.log(json.result);

              swal
                .fire({
                  title: "Hecho",
                  text: "El password se cambió con éxito",
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                })
                .then(() => vm.$router.push("/myAccount"));
            } else {
              swal.fire(
                "Error",
                "Ocurrió un error intentando cambiar el password",
                "error"
              );
              console.error(json.error);
            }
          })
          .catch((err) => {
            swal.fire("Error", "Error", "error"), console.error(err);
          });
      }
    },
    cancel: function () {
      this.$router.go(-1);
    },
    validate: function () {
      let vm = this;
      let valid = true;

      vm.wasValidated = true;
      valid = valid && vm.oldPasswordValid;
      valid = valid && vm.newPasswordValid;
      valid = valid && vm.repeatPasswordValid;

      return valid;
    },
  },
  computed: {
    oldPasswordValid: function () {
      return (
        this.oldPassword != "" &&
        this.oldPassword == this.$store.getters.user.password
      );
    },
    newPasswordValid: function () {
      return (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
          this.newPassword
        ) && this.newPassword != this.$store.getters.user.password
      );
    },
    repeatPasswordValid: function () {
      return (
        this.repeatPassword != "" && this.repeatPassword == this.newPassword
      );
    },
  },
};
</script>

<style>
</style>