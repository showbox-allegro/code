export default {
    state: {
        temps: [],
    },
    mutations: {
        setTemps(state, payload) {
            state.temps = payload.temps;
            state.waiting = false;
        },
        addTemp(state, payload){
            state.temps.unshift(payload.temp);
            state.waiting = false;
        }
    },
    actions: {
        getTemps() {

        },
        addTemp() {

        }
    }

};
