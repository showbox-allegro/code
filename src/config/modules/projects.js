export default {
    state: {
        projects: [],
    },
    mutations: {
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
                    const data = require("../../database/projects.json")
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
};
