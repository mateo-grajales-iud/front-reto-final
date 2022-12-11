<template lang="">
  <NavBarComponent />
  <div v-if="usuario.user.role == 1" class="row justify-content-center m-5">
    <div class="col-5">
      <form @submit.prevent="crearAsignatura">
        <h5>Crear asignaturas</h5>
        <label class="form-label">Nombre</label>
        <input class="form-control" v-model="nombre" type="text" required />
        <label class="form-label">Creditos</label>
        <input
          class="form-control"
          v-model="creditos"
          type="number"
          min="0"
          required
        />
        <label class="form-label">Docente</label>
        <input class="form-control" v-model="docente" />
        <label class="form-label">Prerequisito</label>
        <select class="form-control" v-model="prerequisito">
          <option
            v-for="asignatura in asignaturas"
            :key="asignatura.id"
            :value="asignatura"
          >
            {{ asignatura.id + ": " + asignatura.nombre }}
          </option>
        </select>
        <label class="form-label">Horas trabajo autonomo</label>
        <input
          class="form-control"
          v-model="trabajo_autonomo"
          type="number"
          min="0"
          required
        />
        <label class="form-label">Horas trabajo dirigido</label>
        <input
          class="form-control"
          v-model="trabajo_dirigido"
          type="number"
          min="0"
          required
        />
        <input class="btn btn-primary mb-3 mt-3" type="submit" value="Crear" />
      </form>
    </div>

    <div class="col-5">
      <form @submit.prevent="editarAsignatura">
        <h5>Editar asignaturas</h5>
        <label>Asignatura</label>
        <select
          class="form-control"
          v-model="asignaturaEditar"
          @change="cambioEditar"
        >
          <option
            v-for="asignatura in asignaturas"
            :key="asignatura.id"
            :value="asignatura"
          >
            {{ asignatura.id + ": " + asignatura.nombre }}
          </option>
        </select>
        <label class="form-label">Nombre</label>
        <input
          class="form-control"
          v-model="nombreEditar"
          type="text"
          required
        />
        <label class="form-label">Creditos</label>
        <input
          class="form-control"
          v-model="creditosEditar"
          type="number"
          min="0"
          required
        />
        <label class="form-label">Docente</label>
        <input class="form-control" v-model="docenteEditar" />
        <label class="form-label">Prerequisito</label>
        <select class="form-control" v-model="prerequisitoEditar">
          <option></option>
          <option
            v-for="asignatura in asignaturas"
            :key="asignatura.id"
            :value="asignatura"
          >
            {{ asignatura.id + ": " + asignatura.nombre }}
          </option>
        </select>
        <label class="form-label">Horas trabajo autonomo</label>
        <input
          class="form-control"
          v-model="trabajo_autonomoEditar"
          type="number"
          min="0"
          required
        />
        <label class="form-label">Horas trabajo dirigido</label>
        <input
          class="form-control"
          v-model="trabajo_dirigidoEditar"
          type="number"
          min="0"
          required
        />
        <input class="btn btn-primary mb-3 mt-3" type="submit" value="Editar" />
      </form>
    </div>
  </div>
  <div>
    <div class="row justify-content-center m-5">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Creditos</th>
            <th>Docente</th>
            <th>Prerrequisito</th>
            <th>Trabajo autonomo</th>
            <th>Trabajo dirigido</th>
            <th v-if="usuario.user.role == 1">Borrar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="asignatura in asignaturas"
            :key="asignatura.id"
            :value="asignatura"
          >
            <td>{{ asignatura.id }}</td>
            <td>{{ asignatura.nombre }}</td>
            <td>{{ asignatura.creditos }}</td>
            <td>{{ asignatura.docente }}</td>
            <td>
              {{
                asignatura.prerequisito != null
                  ? asignaturas.find((obj) => obj.id == asignatura.prerequisito)
                      .nombre
                  : null
              }}
            </td>
            <td>{{ asignatura.trabajo_autonomo }}</td>
            <td>{{ asignatura.trabajo_dirigido }}</td>
            <td v-if="usuario.user.role == 1" @click="borrarAsignatura(asignatura)"><button>Borrar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBarComponent from "./NavBarComponent.vue";

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
  data() {
    return {
      asignaturas: [],
      nombre: "",
      docente: "",
      creditos: "",
      prerequisito: "",
      trabajo_autonomo: "",
      trabajo_dirigido: "",
      nombreEditar: "",
      docenteEditar: "",
      creditosEditar: "",
      prerequisitoEditar: "",
      trabajo_autonomoEditar: "",
      trabajo_dirigidoEditar: "",
      asignaturaEditar: "",
    };
  },
  mounted() {
    this.getAsignaturas();
  },
  components: {
    NavBarComponent,
  },
  methods: {
    async borrarAsignatura(id){
      console.log("borrando ", id)
      var url = "http://laravel-sanctum-api.test/api/asignaturas/" + id.id;
      var conf = {
        headers: {
          Authorization: "Bearer " + this.usuario.token,
        },
      };
      console.log(url);
      console.log(conf);
      await axios
        .delete(url, conf, {})
        .then((res) => {
          console.log(res.data);
          this.exito = "Exito borrando asignatura";
          this.error = "";
          this.getAsignaturas();
        })
        .catch((err) => {
          console.log(err);
          this.exito = "";
          this.error = err.message;
        });
      console.log("fin borrar asignatura");
    },
    async editarAsignatura(){
      console.log("editando");
      var url = "http://laravel-sanctum-api.test/api/asignaturas/" + this.asignaturaEditar.id;
      var asignatura = {
        nombre: this.nombreEditar,
        creditos: this.creditosEditar,
        docente: this.docenteEditar,
        prerequisito: this.prerequisitoEditar == ""? null : this.prerequisitoEditar.id,
        trabajo_autonomo: this.trabajo_autonomoEditar,
        trabajo_dirigido: this.trabajo_dirigidoEditar,
      };
      var conf = {
        headers: {
          Authorization: "Bearer " + this.usuario.token,
        },
      };
      console.log(asignatura);
      await axios
        .put(url, asignatura, conf)
        .then((res) => {
          console.log(res.data);
          this.exito = "Exito editando asignatura";
          this.error = "";
          this.getAsignaturas();
        })
        .catch((err) => {
          console.log(err);
          this.exito = "";
          this.error = err.message;
        });
      console.log("fin editar asignatura");
    },

    cambioEditar() {
      var asig = this.asignaturaEditar;
      var pre = this.asignaturas.find(obj => obj.id == asig.prerequisito);
      this.nombreEditar = asig.nombre;
      this.docenteEditar = asig.docente;
      this.creditosEditar = asig.creditos;
      this.prerequisitoEditar = pre;
      this.trabajo_autonomoEditar = asig.trabajo_autonomo;
      this.trabajo_dirigidoEditar = asig.trabajo_dirigido;
    },

    async getAsignaturas() {
      var url = "http://laravel-sanctum-api.test/api/asignaturas";
      await axios
        .get(url, {}, {})
        .then((res) => {
          console.log(res.data);
          this.asignaturas = res.data;
          this.error = "";
        })
        .catch((err) => {
          console.log(err);
          this.exito = "";
          this.error = err.message;
        });
    },

    async crearAsignatura() {
      var url = "http://laravel-sanctum-api.test/api/asignaturas";
      var asignatura = {
        nombre: this.nombre,
        creditos: this.creditos,
        docente: this.docente,
        prerequisito: this.prerequisito.id,
        trabajo_autonomo: this.trabajo_autonomo,
        trabajo_dirigido: this.trabajo_dirigido,
      };
      var conf = {
        headers: {
          Authorization: "Bearer " + this.usuario.token,
        },
      };
      console.log(asignatura);
      await axios
        .post(url, asignatura, conf)
        .then((res) => {
          console.log(res.data);
          this.exito = "Exito creando asigatura";
          this.error = "";
          this.getAsignaturas();
        })
        .catch((err) => {
          console.log(err);
          this.exito = "";
          this.error = err.message;
        });
      console.log("fin crear asignatura");
    },
  },
};
</script>

<style lang=""></style>
