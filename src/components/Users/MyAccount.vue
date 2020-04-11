<template>
  <div class="container">
    <h1>Cuenta</h1>
    <div class="row mb-3">
      <div class="col-1">
        <a href="#" v-if="!editMode" @click.prevent="toggleEditMode">Editar</a>
      </div>
    </div>
    <form @submit.prevent="edit">
      <div class="row mb-3">
        <label class="col" for="username">Nombre de usuario:</label>
        <span class="col">{{ user.username }}</span>
      </div>
      <div class="row mb-3">
        <label class="col" for="firstName">Nombre:</label>
        <span class="col" v-if="!editMode">{{ user.firstName }}</span>
        <input
          v-else
          class="form-control col d-inline"
          :class="{ 'is-valid': wasValidated && firstNameValid, 'is-invalid': wasValidated && !firstNameValid }"
          v-model="editUser.firstName"
          type="text"
          placeholder="Nombre"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">El nombre es obligatorio.</div>
      </div>
      <div class="row mb-3">
        <label class="col" for="lastName">Apellido:</label>
        <span class="col" v-if="!editMode">{{ user.lastName }}</span>
        <input
          v-else
          class="form-control col d-inline"
          :class="{ 'is-valid': wasValidated && lastNameValid, 'is-invalid': wasValidated && !lastNameValid }"
          v-model="editUser.lastName"
          type="text"
          placeholder="Apellido"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">El apellido es obligatorio.</div>
      </div>
      <div class="row mb-3">
        <label class="col" for="age">Edad:</label>
        <span class="col" v-if="!editMode">{{ user.age }}</span>
        <input
          v-else
          class="form-control col d-inline"
          :class="{ 'is-valid': wasValidated && ageValid, 'is-invalid': wasValidated && !ageValid }"
          v-model="editUser.age"
          type="number"
          placeholder="Edad"
        />
        <div class="valid-feedback">Bien.</div>
        <div class="invalid-feedback">La edad es obligatoria y debe ser 13 años o mayor.</div>
      </div>
      <div class="row mb-3">
        <input v-if="editMode" class="btn btn-primary offset-3 col-2" type="submit" value="Enviar" />
        <input
          v-if="editMode"
          class="btn btn-danger offset-2 col-2"
          @click.prevent="toggleEditMode"
          type="button"
          value="Cancelar"
        />
      </div>
    </form>
    <hr />
    <div class="row mb-3">
      <div class="col-2">
        <router-link to="/changePassword" v-if="!editMode">Cambiar password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  data: function() {
    return {
      editUser: {
        firstName: "",
        lastName: "",
        age: ""
      },
      editMode: false,
      wasValidated: false
    };
  },
  methods: {
    toggleEditMode: function() {
      let vm = this;
      vm.wasValidated = false;
      vm.editMode = !vm.editMode;

      if (vm.editUser.firstName) {
        vm.editUser = {
          firstName: "",
          lastName: "",
          age: ""
        };
      } else {
        vm.editUser.firstName = vm.user.firstName;
        vm.editUser.lastName = vm.user.lastName;
        vm.editUser.age = vm.user.age;
      }
    },
    edit: function() {
      let vm = this;

      if (vm.validateInfo()) {
        swal.fire({
          icon: "info",
          text: "Por favor, espere.",
          title: "Modificando!",
          onBeforeOpen: () => {
            swal.showLoading();
            fetch(
              `http://localhost:8081/api/account/updateAccountInfo/${vm.user.username}`,
              {
                method: "POST",
                body: JSON.stringify(vm.editUser),
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
              .then(res => res.json())
              .then(json => {
                if (json.ok) {
                  swal
                    .fire({
                      icon: "success",
                      title: `Hecho!`,
                      timer: 2000,
                      timerProgressBar: true
                    })
                    .then(() => {
                      console.log(json.result);
                      vm.$store.dispatch("setUser", json.result);
                      vm.toggleEditMode();
                    });
                } else {
                  swal.fire(
                    "Error",
                    "Ocurrió un error en la modificación",
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
      }
    },
    validateInfo: function() {
      let vm = this;
      let valid = true;
      vm.wasValidated = true;

      valid = valid && vm.firstNameValid;
      valid = valid && vm.lastNameValid;
      valid = valid && vm.ageValid;

      return valid;
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.user;
    },
    firstNameValid: function() {
      return this.editUser.firstName != "";
    },
    lastNameValid: function() {
      return this.editUser.lastName != "";
    },
    ageValid: function() {
      return this.editUser.age != "" && this.editUser.age > 12;
    }
  }
};
</script>

<style>
</style>  