export default {
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload.products;
            state.waiting = false;
        },
    },
    actions: {
        getProducts({ commit, rootState }) {
            rootState.waiting = true;
            setTimeout(()=> {
            // axios
                // .get(`/adres/${id}`).then(({ data }) => {
                    const data = require("../../database/products.json")
                    commit("setProducts", { products: data });
                    commit("showAlert", { text: "Produkty załadowane", type: "success"});
                    rootState.waiting = false;
                    // });
            },1000)

        },
    },
};
