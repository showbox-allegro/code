export default {
    state: {
        temps: [],
    },
    mutations: {
        setTemps(state, payload) {
            state.temps = payload.temps;
        },
        addTemp(state, payload){
            payload.temp.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            state.temps.unshift(payload.temp);
        }
    },
    actions: {
        getTemps({ commit, rootState }) {
            rootState.waiting = true;
            setTimeout(()=> {
            // axios
                // .get(`/adres/${id}`).then(({ data }) => {
                    const data = require("../../database/templates.json")
                    commit("setTemps", { temps: data });
                    commit("showAlert", { text: "Szablony załadowane", type: "success"});
                    rootState.waiting = false;
                    // });
            },1000)

        },
        addTemp({commit, rootState}, temp) {
            rootState.waiting = true;
            commit("addTemp", { temp });
            commit("showAlert", { text: "Nowy szablon został utworzony", type: "success"});
            rootState.waiting = false;
        },
    }

};
