<template lang="">  
  <NavBarComponent />
  <div class="row">
    <div class="col">
      <div class="p-5">
        <form class="mb-3" @submit.prevent="iniciarSesion">
          <label class="form-label">Email</label>
          <input class="form-control" type="Email" v-model="email" />
          <label class="form-label">Password</label>
          <input class="form-control" type="password" v-model="password" />
          <input
            class="btn btn-primary mb-3 mt-3"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>
      </div>
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
  components: {
    NavBarComponent
  },
  setup(){
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
      usuario
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      exito: "",
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
    async iniciarSesion() {
      console.log("iniciando sesión");
      var url = "http://laravel-sanctum-api.test/api/login";
      var credenciales = {
        email: this.email,
        password: this.password,
      };
      await axios
        .post(url, credenciales, {})
        .then((res) => {
          console.log(res.data);
          this.exito = "Exito iniciando sesión";
          this.error = "";
          this.usuario = res.data;
          localStorage.usuario = JSON.stringify(res.data);
          this.$router.push("asignaturas");
        })
        .catch((err) => {
          console.log(err);
          this.exito = "";
          this.error = err.message;
        });
      console.log("fin iniciando sesión");
    },
  },
  beforeMount() {},
};
</script>

<style lang=""></style>
