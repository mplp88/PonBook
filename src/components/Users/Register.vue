<template>
  <div class="container">
    <h2>Nuevo usuario</h2>
    <form @submit.prevent="register" novalidate>
      <div class="form-group">
        <input
          id="firstName"
          name="firstName"
          class="form-control"
          v-model="newUser.firstName"
          type="text"
          placeholder="Nombre"
          :class="{ 'is-valid': wasValidated && firstNameValid, 'is-invalid': wasValidated &&  !firstNameValid }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">El nombre es obligatorio.</div>
      </div>
      <div class="form-group">
        <input
          id="lasName"
          name="lasName"
          class="form-control"
          v-model="newUser.lastName"
          type="text"
          placeholder="Apellido"
          :class="{ 'is-valid': wasValidated && lastNameValid, 'is-invalid': wasValidated && !lastNameValid }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">El apellido es obligatorio.</div>
      </div>
      <div class="form-group">
        <input
          id="age"
          name="age"
          class="form-control"
          v-model="newUser.age"
          type="number"
          placeholder="Edad"
          :class="{ 'is-valid': wasValidated && ageValid, 'is-invalid': wasValidated && !ageValid }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">La edad es obligatoria y debe ser 13 años o mayor.</div>
      </div>
      <div class="form-group">
        <input
          id="username"
          name="username"
          class="form-control"
          v-model="newUser.username"
          type="text"
          placeholder="Usuario"
          :class="{ 'is-valid': wasValidated && usernameValid, 'is-invalid': wasValidated && !usernameValid }"
        />
        <div class="valid-feedback">Bien.</div>
        <div
          class="invalid-feedback"
        >El nombre de usuario es obligatorio y debe contener más de 3 caracteres.</div>
      </div>
      <div class="form-group">
        <input
          id="password"
          name="password"
          class="form-control"
          v-model="newUser.password"
          type="password"
          placeholder="Password"
          :class="{ 'is-valid': wasValidated && passwordValid, 'is-invalid': wasValidated && !passwordValid }"
        />
        <div class="valid-feedback">Bien.</div>
        <div
          class="invalid-feedback"
        >El password es obligatorio y debe contener al menos una letra minuscula, una letra mayuscula, un número y un caracter especial (!, @, #, $, %, ^, & o *).</div>
      </div>
      <div class="form-group">
        <input
          id="repeatPassword"
          name="repeatPassword"
          class="form-control"
          v-model="repeatPassword"
          type="password"
          placeholder="Repetir Password"
          :class="{ 'is-valid': wasValidated && repeatPasswordValid, 'is-invalid': wasValidated && !repeatPasswordValid }"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">Los passwords no coinciden.</div>
      </div>
      <div class="form-group">
        <input class="btn btn-primary" type="submit" value="Enviar" />
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  data: function() {
    return {
      newUser: {
        firstName: "",
        lastName: "",
        age: "",
        username: "",
        password: ""
      },
      repeatPassword: "",
      wasValidated: false
    };
  },
  methods: {
    register: function() {
      let vm = this;

      if (vm.validate()) {
        swal.fire({
          icon: "info",
          text: "Por favor, espere.",
          title: "Registrando!",
          onBeforeOpen: () => {
            swal.showLoading();
            fetch("http://localhost:8081/register", {
              method: "POST",
              body: JSON.stringify(vm.newUser),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => res.json())
              .then(json => {
                if (json.ok) {
                  swal
                    .fire({
                      icon: "success",
                      title: `Hecho! Redirigiendo a la página de login`,
                      timer: 2000,
                      timerProgressBar: true
                    })
                    .then(() => {
                      console.log(json.result);
                      vm.$router.push("/login");
                    });
                } else {
                  swal.fire(
                    "Error",
                    "Ocurrió un error en la registración",
                    "error"
                  );
                  console.error(json.error);
                }
              })
              .catch(err => {
                swal.fire("Error", "Error", "error");
                console.error(err);
              });
          }
        });
      } else {
        swal.fire(
          "Datos inválidos",
          "Por favor revise los campos marcados en rojo.",
          "error"
        );
      }
    },
    validate: function() {
      let vm = this;
      let valid = true;
      vm.wasValidated = true;

      valid = valid && vm.firstNameValid;
      valid = valid && vm.lastNameValid;
      valid = valid && vm.ageValid;
      valid = valid && vm.usernameValid;
      valid = valid && vm.passwordValid;
      valid = valid && vm.repeatPasswordValid;

      return valid;
    }
  },
  computed: {
    firstNameValid: function() {
      return this.newUser.firstName != "";
    },
    lastNameValid: function() {
      return this.newUser.lastName != "";
    },
    ageValid: function() {
      return this.newUser.age != "" && this.newUser.age > 12;
    },
    usernameValid: function() {
      return this.newUser.username != "" && this.newUser.username.length > 3;
    },
    passwordValid: function() {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        this.newUser.password
      );
    },
    repeatPasswordValid: function() {
      return (
        this.repeatPassword != "" &&
        this.repeatPassword == this.newUser.password
      );
    }
  },
  mounted: function() {
    document.getElementById('firstName').focus();
  }
};
</script>

<style>
</style>