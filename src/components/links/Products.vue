<template>
    <div class="products">   
        <div class="title">
            <h3>Produkty</h3>
            <a-button type="dashed">
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        Dodaj <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a href="javascript:;">Dodaj z bazy</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">Dodaj puste</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj" v-model="query"/>
        </div>
        <s-empty v-if="!filteredProducts.length"></s-empty>
        <ul v-else class="links__items">
            <li 
                v-for="product in filteredProducts" 
                :class="{'is-selected': product.id == selection}"
                class="links__item" 
                :key="product.id"
                @click="$emit('selectProduct', product.id)"
            >
                <div>
                    <img class="products__image" src="@/assets/products/pills.png" />
                    Nazwa produktu
                </div>
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        <a-icon type="more" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <span><a-icon type="edit" /> Zmień nazwę</span>
                        </a-menu-item>
                        <a-menu-item>
                            <span><a-icon type="delete" /> Usuń</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </li>
        </ul>
    </div>
</template>

<script>
import Empty from "../layout/Empty";

export default {
    name: 'Products',
    props: {
        selection: Number
    },
    components: {
        SEmpty: Empty
    },
    data(){
        return {
            query: "",
            products: [
                {
                    id: 1,
                    name: "Nazwa produktu"
                },
                {
                    id: 2,
                    name: "Nazwa produktu"
                },
                {
                    id: 3,
                    name: "Nazwa produktu"
                },
                {
                    id: 4,
                    name: "Nazwa produktu"
                },
                {
                    id: 5,
                    name: "Nazwa produktu"
                }
            ]
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
            margin-right: 4px;
        }

    }
</style>