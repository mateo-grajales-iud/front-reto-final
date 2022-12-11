import {
    createStore
} from "vuex";

export default createStore({
    state: {
        usuario: {},
        vacio: true
    },
    mutations: {
        setUsuario(state, data) {
            state.usuario = data;
            state.vacio = false;
        },
        limpiarUsuario(state) {
            state.usuario = {};
            state.vacio = true;
        },
        getUsuario(state) {
            return state.usuario;
        }
    }
});