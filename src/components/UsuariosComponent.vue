<template lang="">
  <NavBarComponent />
  <div class="row justify-content-center m-5">
    <div class="col-8">
      <form @submit.prevent="crearUsuario">
        <h5>Registro de usuarios</h5>
        <label class="form-label">Nombre</label>
        <input v-model="nombre" class="form-control" type="text" required />
        <label class="form-label">Email</label>
        <input v-model="email" class="form-control" type="email" required />
        <label class="form-label">Contraseña</label>
        <input
          v-model="contrasena"
          class="form-control"
          type="password"
          required
        />
        <label class="form-label">Confirme contraseña</label>
        <input
          v-model="confContrasena"
          class="form-control"
          type="password"
          required
        />
        <label class="form-label">Role</label>
        <select v-model="rol" class="form-control">
          <option value="1">Coordinador</option>
          <option value="2">Estudiante</option>
        </select>
        <input class="btn btn-primary mb-3 mt-3" type="submit" value="Crear" />
      </form>
    </div>
  </div>

  <div>
    <div class="alert alert-danger" role="alert" v-if="onError">
      {{ onError }}
    </div>
    <div class="alert alert-success" role="alert" v-if="onExito">
      {{ onExito }}
    </div>
  </div>

</template>

<script>
import axios from "axios";
import NavBarComponent from "./NavBarComponent.vue";

export default {
  setup() {
    console.log("validando usuario...");
    console.log(localStorage.usuario);
    var usuario;
    if (localStorage.usuario == undefined || localStorage.usuario == null) {
      usuario = {
        user: {
          id: null,
          name: null,
          email: null,
          email_verified_at: null,
          role: null,
          created_at: null,
          updated_at: null,
        },
        token: null,
      };
    } else {
      usuario = JSON.parse(localStorage.usuario);
    }
    return {
      usuario,
    };
  },
  components: {
    NavBarComponent,
  },
  data() {
    return {
      exito: "",
      error: "",
      nombre: "",
      email: "",
      contrasena: "",
      confContrasena: "",
      rol: "",
    };
  },
  computed: {
    onError() {
      return this.error;
    },
    onExito() {
      return this.exito;
    },
  },
  methods: {
    async crearUsuario() {
      console.log("creando usuario");
      var url = "http://laravel-sanctum-api.test/api/register";
      var credenciales = {
        name: this.nombre,
        email: this.email,
        password: this.contrasena,
        password_confirmation: this.confContrasena,
        role: this.rol,
      };
      await axios
        .post(url, credenciales, {})
        .then((res) => {
          console.log(res.data);
          this.exito = "Exito creando usuario";
          this.error = "";
        })
        .catch((err) => {
          console.log(err);
          this.exito = "";
          this.error = err.message;
        });
      console.log("fin crear usuario");
    },
  },
};
</script>

<style lang=""></style>
