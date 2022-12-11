import { createRouter, createWebHistory } from "vue-router";
import LoginComponentVue from "@/components/LoginComponent.vue";
import AsignaturaComponentVue from "@/components/AsignaturaComponent.vue";
import UsuariosComponentVue from "@/components/UsuariosComponent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginComponentVue
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponentVue
    },
    {
      path: "/asignaturas",
      name: "asignaturas",
      component: AsignaturaComponentVue
    },
    {
      path: "/usuarios",
      name: "usuarios",
      component: UsuariosComponentVue
    },
  ],
});

export default router;
