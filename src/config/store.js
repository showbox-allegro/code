import Vue from "vue";
import Vuex from "vuex";
import ProjectsModule from "./modules/projects";
import TemplatesModule from "./modules/templates";
import ProductsModule from "./modules/products";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ProjectsModule,
        TemplatesModule,
        ProductsModule
    },
    state: {
        alert: {},
        alertVisible: false,
        waiting: false,
    },
    getters: {

    },
    mutations: {
        showAlert(state, payload){
            state.alertVisible = true;
            state.alert = payload; 
            setTimeout(()=>{state.alertVisible = false}, 1000);
        },

    },
    actions: {


    },
});
