<template>
    <div class="products ">   
        <div class="title">
            <h3>Produkty</h3>
            <a-button type="dashed">
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        Dodaj <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item @click="addProductModal=true">
                            <a href="javascript:;">Dodaj z bazy</a>
                        </a-menu-item>
                        <a-menu-item @click="emptyProductModal=true">
                            <a href="javascript:;">Dodaj puste</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj" v-model="query"/>
        </div>
        <s-empty v-if="query && !filteredProducts.length"/>
        <ul v-else class="links__items">
            <s-product 
                v-for="product in filteredProducts" 
                :product="product"
                :class="{'is-selected': product.id == selection}"
                class="links__item" 
                :key="product.id"
                @selectProduct="$emit('selectProduct', product.id)"
                @deleteProduct="$emit('deleteProduct', product.id)"
            />
        </ul>
        <s-add-product 
            v-if="addProductModal"
            @addProducts = "addProducts"
            @closeAddProductModal = "addProductModal = false"
        />

        <a-modal 
            v-model="emptyProductModal" 
            @ok="addEmptyProducts"
            @cancel="emptyProductModal=false"
        >
            <p class="infoModal__desc">Wybierz ilość pustych produktów jaką chcesz dodać.</p>
            <a-input class="infoModal__input" v-model="emptyProductsNumber" placeholder="Liczba pustych produktów" />

            <template slot="footer">
                <a-button key="back" type="default" @click="emptyProductModal=false">
                    Anuluj
                </a-button>
                <a-button key="submit" type="primary" @click="addEmptyProducts">
                    Dodaj
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import Empty from "../../layout/Empty";
import Product from "./Product";
import AddProduct from "./AddProduct";

export default {
    name: 'Products',
    props: {
        selection: Number,
        products: Array
    },
    components: {
        SProduct: Product,
        SAddProduct: AddProduct,
        SEmpty: Empty
    },
    data(){
        return {
            query: "",
            emptyProductsNumber: 3,
            emptyProductModal: false,
            addProductModal: false,
            // productsToAdd: [
            //     {
            //         "id": 1,
            //         "name": "Produkt 1",
            //         "image": "pills.png"
            //     },
            //     {
            //         "id": 2,
            //         "name": "Produkt 2",
            //         "image": "pills.png"
            //     }
            // ]
        }
    },
    computed: {
        filteredProducts(){
            return this.query 
                ? 
                this.products.filter(p=>p.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 )
                : 
                this.products;
        }
    },
    methods: {
        addEmptyProducts(){
            this.emptyProductModal = false;
            this.$emit('addEmptyProducts',this.emptyProductsNumber)
        },
        addProducts(products){
            this.addProductModal = false;
            this.$emit('addProducts',products);
        } 
    }
 
}
</script>

<style lang="less">
    .products {
        width: 25%;
        border-right: solid 1px @gray-4;

        &__image {
            width: 32px;
            height: 32px;
            border-radius: 2px;
            margin-right: 8px;
        }

        &__info {
            display: flex;
            align-items: center;
        }

    }
</style>