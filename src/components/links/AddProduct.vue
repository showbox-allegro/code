<template>
    <a-modal class="add-product"
        v-model="visible"
        title="Dodaj ofertę" 
        @ok="$emit('addProducts',selectedProducts)"
        @cancel="$emit('closeAddProductModal')"
    >
        <div class="add-product__search">
            <a-input placeholder="Szukaj">
                <a-icon slot="prefix" type="search" />
            </a-input>
        </div>
        
        <a-table 
            v-if="products.length" 
            :columns="columns" 
            :data-source="products"
            :row-selection="rowSelection"
        >
    

        </a-table>

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeAddProductModal')">
                Zamknij
            </a-button>
            <a-button key="submit" type="primary" @click="$emit('addProducts',selectedProducts)">
                Dodaj zaznaczone
            </a-button>
        </template>

    </a-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: 'AddProduct',
    data(){
        return {
            visible: true,
            selectedProducts: [],
            columns: [
                {
                    title: 'Nazwa produktu',
                    key: 'name',
                    dataIndex: 'name'
                },
                {
                    title: 'Nr oferty',
                    key: 'offerId',
                    dataIndex: 'offerId'
                }
            ],
            rowSelection: {
                // onChange: (selectedRowKeys, selectedRows) => {
                //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // },
                onSelect: (record, selected, selectedRows) => {
                    //console.log(record, selected, selectedRows);
                    this.selectedProducts = selectedRows;
                },
                onSelectAll: (selected, selectedRows) => {
                //     //console.log(selected, selectedRows, changeRows);
                    this.selectedProducts = selectedRows;
                },
            }
        }
    },
    computed:{
		...mapState({
			products: state => state.ProductsModule.products,
        }),
    },
    mounted(){
        if (!this.products.length) {
            this.getProducts();
        }
    },
    methods: {
        ...mapActions(["getProducts"])
    }
}
</script>

<style lang="less">
.add-product {
    &__search {
        padding: 16px;
        border-bottom: solid 1px @gray-4;
    }
    .ant-modal-body {
        padding: 0px;
    }
    td:nth-child(3) {
        color: @primary-6;
        text-decoration: underline;
    }
}

</style>