import Vue from "vue";
import Vuex from "vuex";
import PathsModule from "./modules/paths";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PathsModule,
    },
    state: {
        alert: {},
        alertVisible: false,
        waiting: false,
        projects: [],
    },
    getters: {

    },
    mutations: {
        showAlert(state, payload){
            state.alertVisible = true;
            state.alert = payload; 
            setTimeout(()=>{state.alertVisible = false}, 3000);
        },
        setProjects(state, payload) {
            state.projects = payload.projects;
            state.waiting = false;
        },
        addProject(state, payload){
            state.projects.unshift(payload.project);
            state.waiting = false;
        }
    },
    actions: {
        getProjects({ commit, state }) {
            state.waiting = true;
            setTimeout(()=> {
            // axios
                // .get(`/adres/${id}`).then(({ data }) => {
                    const data = require("../database/projects.json")
                    commit("setProjects", { projects: data });
                    commit("showAlert", { text: "Projekty załadowane", type: "success"});
                // });
            },3000)

        },
        addProject({commit, state}, project) {
            state.waiting = true;
            // const payload = project;
            // axios
                // .post("/adres", payload)
                // .then(({data}) => {
                    commit("addAnswer", { project });
                // })
        }

    },
});
