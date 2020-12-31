export default {
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload.products;
            state.waiting = false;
        },
        addProduct(state, payload){
            state.products.unshift(payload.product);
            state.waiting = false;
        }
    },
    actions: {
        getProducts() {

        },
        addProduct() {

        }
    },
};
