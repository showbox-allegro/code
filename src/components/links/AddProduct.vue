<template>
    <a-modal 
        v-model="visible"
        title="Dodaj produkty" 
        @ok="$emit('addProducts')"
        @cancel="$emit('closeAddProductModal')"
    >
        <p class="infoModal__desc">TODO</p>

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeAddProductModal')">
                Zamknij
            </a-button>
            <a-button key="submit" type="primary" @click="$emit('addProducts')">
                Dodaj zaznaczone
            </a-button>
        </template>

    </a-modal>
</template>

<script>
export default {
    name: 'AddProduct',
    props: {
        productsToAdd: Array,
    },
    data(){
        return {
            visible: true
        }
    },
}
</script>

<style lang="less">
    .infoModal {
        &__desc {
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;
        }

        &__input {
            margin-bottom: 8px;
        }
    }
</style>