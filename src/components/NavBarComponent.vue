<template lang="">
    {{ usuario }}
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink
            v-if="usuario.user.role > 0"
            class="nav-link"
            :class="{ active: $route.name === 'asignaturas' }"
            to="/asignaturas"
            >Asignaturas</RouterLink
          >
          <div v-if="usuario.user.role == 1">
            <RouterLink
              class="nav-link"
              :class="{ active: $route.name === 'usuarios' }"
              to="/usuarios"
              >Usuarios</RouterLink
            >
          </div>
        </div>
      </div>
      <div class="navbar-nav">
        <li v-if="usuario.user.name != null" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ usuario.user.name }}
          </a>
          <ul class="dropdown-menu">
            <li>
              <a class="nav-link daClick" @click="cerrarSesion"
                >Cerrar sesión</a
              >
            </li>
          </ul>
        </li>        
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  setup() {
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
  methods: {
    async cerrarSesion() {
      console.log("cerrando sesion");
      var url = "http://laravel-sanctum-api.test/api/logout";
      var conf = {
        headers: {
          Authorization: "Bearer " + this.usuario.token,
        },
      };
      console.log(conf);
      await axios
        .post(url, {}, conf)
        .then((res) => {
          console.log(res.message);
          this.exito = "Exito cerrando sesión";
          this.error = "";
          this.usuario = {
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
          localStorage.usuario = JSON.stringify({
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
          });
          this.$router.push("login");
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 401) {
            this.usuario = {
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
            localStorage.usuario = JSON.stringify({
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
            });
            this.$router.push("login");
          } else {
            this.exito = "";
            this.error = err.message;
          }
        });
    },
  },
  beforeMount() {},
};
</script>

<style lang=""></style>
