<template>
    <a-modal class="add-product"
        v-model="visible"
        title="Dodaj ofertę" 
        @ok="$emit('addProducts',selectedProducts)"
        @cancel="$emit('closeAddProductModal')"
        :width="600"
    >
        <div class="add-product__search">
            <a-input placeholder="Szukaj" v-model="query">
                <a-icon slot="prefix" type="search" />
            </a-input>
        </div>
        
         <a-config-provider>
            <template #renderEmpty>
                <s-empty :size="'xl'"/>
            </template>
            <div class="config-provider">

                <a-table 
                    v-if="products.length" 
                    :columns="columns" 
                    :data-source="filteredProducts"
                    :row-selection="rowSelection"
                    :row-key="'id'"
                >
                    <img class="add-product__image" slot="image" slot-scope="text" :src="text" />
                    <a slot="offerId" slot-scope="text">{{ text }}</a>
                </a-table>
            </div>
        </a-config-provider>

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeAddProductModal')">
                Zamknij
            </a-button>
            <a-button :disabled="!selectedProducts.length" key="submit" type="primary" @click="$emit('addProducts',selectedProducts)">
                Dodaj zaznaczone
            </a-button>
        </template>

    </a-modal>
</template>

<script>
import Empty from "../../layout/Empty";
import { mapState, mapActions } from "vuex";

export default {
    name: 'AddProduct',
    components: {
        SEmpty: Empty
    },
    data(){
        return {
            query: "",
            visible: true,
            selectedProducts: [],
            columns: [
                {
                    title: 'Nazwa produktu',
                    key: 'image',
                    dataIndex: 'image',
                    scopedSlots: { customRender: 'image' },
                    width: 36,
                    colSpan: 2
                },
                {
                    title: '',
                    key: 'name',
                    dataIndex: 'name',
                    ellipsis: true,
                    colSpan: 0
                },
                {
                    title: 'Nr oferty',
                    key: 'offerId',
                    dataIndex: 'offerId',
                    scopedSlots: { customRender: 'offerId' },
                    width: 210
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
        filteredProducts(){
            return this.query 
                ? 
                this.products.filter(p=>p.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 )
                : 
                this.products;
        }
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
    th:nth-child(2) {
        padding-left: 0;
        text-align: left !important;
    }
    td:nth-child(2) {
        padding: 8px 0 !important;
    }
    td:nth-child(4) {
        text-decoration: underline;
    }
    .ant-table-tbody > tr > td {
        padding: 8px 8px;
        font-weight: 400;
    }

    &__image {
        width: 32px;
        height: 32px;
        border-radius: 2px;
    }
}

</style>