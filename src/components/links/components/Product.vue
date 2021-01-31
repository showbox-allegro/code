<template>
    <li 
        @click="selectProduct"
    >
        <div class="products__info">
            <img class="products__image" src="@/assets/products/pills.png" />
            <p v-if="!editMode">{{ product.name }}</p>
            <a-input 
                v-else 
                v-model="product.name"
                @blur="editMode = false"
                placeholder="Nazwa produktu" 
            />
        </div>
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="more"/>
            </a>
            <a-menu slot="overlay">
                <a-menu-item @click="editMode = true">
                    <span><a-icon type="edit" /> Zmień nazwę</span>
                </a-menu-item>
                <a-menu-item @click="$emit('deleteProduct')">
                    <span><a-icon type="delete" /> Usuń</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </li>
</template>

<script>

export default {
    name: 'Product',
    props: {
        product: Object
    },
    data(){
        return {
            editMode: false,
        }
    },
    methods: {
        selectProduct(){
            if(!this.editMode){
                this.$emit('selectProduct')
            }
        }
    }
}
</script>
