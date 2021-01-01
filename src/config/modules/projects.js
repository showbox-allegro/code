export default {
    state: {
        projects: [],
    },
    mutations: {
        setProjects(state, payload) {
            state.projects = payload.projects;
        },
        addProject(state, payload){
            state.projects.unshift(payload.project);
        },
        removeProject(state, payload){
            const index = state.projects.findIndex(p => p.id === payload.project.id);

            if (index !== -1) {
                state.projects.splice(index, 1);
            }

        },
        duplicateProject(state, payload){
            const copy = Object.assign({}, payload.project);
            //FIXME
            copy.name = copy.name + "(1)";
            copy.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            state.projects.unshift(copy);
        }
    },
    actions: {
        getProjects({ commit, rootState }) {
            rootState.waiting = true;
            setTimeout(()=> {
            // axios
                // .get(`/adres/${id}`).then(({ data }) => {
                    const data = require("../../database/projects.json")
                    commit("setProjects", { projects: data });
                    commit("showAlert", { text: "Projekty załadowane", type: "success"});
                    rootState.waiting = false;
                    // });
            },3000)

        },
        addProject({commit, rootState}, project) {
            rootState.waiting = true;
            commit("addProject", { project });
            commit("showAlert", { text: "Nowy projekt został utworzony", type: "success"});
            rootState.waiting = false;
        },
        removeProject({commit, rootState}, project){
            rootState.waiting = true;
            commit("removeProject", { project});
            commit("showAlert", { text: "Projekt został usunięty", type: "success"});
            rootState.waiting = false;
        },
        duplicateProject({commit, rootState}, project){
            rootState.waiting = true;
            commit("duplicateProject", { project });
            commit("showAlert", { text: "Projekt został zduplikowany", type: "success"});
            rootState.waiting = false;
        }
    },
};
