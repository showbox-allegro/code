
<template>
    <div class="links">   
        <div class="title">
            <p>Edycja powiązań</p>
            <a-icon 
                type="close" 
                :style="{ fontSize: '20px', cursor: 'pointer', padding: '8px'}"
                @click="$emit('closeLinks')"
            />
        </div>
        <div class="links__main">
            <s-templates 
                :selection="selection.template"
                @selectTemplate="selectTemplate"
            ></s-templates>
            <s-products 
                :selection="selection.product"
                @selectProduct="selectProduct"
            ></s-products>
            <s-items></s-items>
            <div class="links__info" v-if="linkReady">
                <p>Nazwa szablonu z Nazwa produktu</p>
                <a-button type="primary">
                    <a-icon type="build" />
                    Powiąż
                </a-button>
            </div>
        </div>
        <div class="links__bottom">
            <a-button type="primary" @click="$emit('closeLinks')">Zapisz i zamknij</a-button>
        </div>
    </div>
</template>

<script>
// import Sidebar from "./Sidebar";
import Templates from "./Templates";
import Products from "./Products";
import Items from "./Items";

export default {
    name: 'Links',
    components: {
    //     SSidebar: Sidebar,
        STemplates: Templates,
        SProducts: Products,
        SItems: Items
    },
    data(){
        return {
            selection: {
                template: null,
                product: null
            }
        }
    },
    computed: {
        linkReady(){
            return this.selection.template && this.selection.product
        }
    },
    methods: {
        selectTemplate(id) {
            this.selection.template = id;
        },
        selectProduct(id) {
            this.selection.product = id;
        }
    }
 
}
</script>

<style lang="less">
    .links {
        position: absolute;
        top: 64px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        // height: 100%;
        background-color: @gray-1;
        z-index: 3;

        &__main {
            display: flex;
            height: calc(100% - 64px - 48px);
        }

        &__search {
            background-color: @gray-2;
            padding: 12px 16px;
        }

        &__items {
            padding: 16px;
        }

        &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            padding: 0px 16px;
            background-color: @gray-2;
            border: 1px solid @gray-4;
            border-radius: 6px;
            font-weight: 400;
            margin-bottom: 4px;
            cursor: pointer;

            .anticon {display: none;}

            &:hover {
                border: 1px solid @gray-6;

                .anticon {
                    padding: 8px;
                    display: block;
                }
            }

            &.is-selected {
                background-color: @primary-1;
                border-color: @primary-7;
            }
        }

        &__bottom {
            padding: 0px 24px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 48px;
            background-color: @gray-2;
            border-top: solid 1px @gray-4;
        }

        &__info {
            width: calc(50% - 32px);
            position: absolute;
            left: 16px;
            bottom: 64px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            background-color: @gray-2;
            border-radius: 6px;
            box-shadow: 0px 3px 6px -4px #000000;
            box-shadow: 0px 6px 16px 0px #000000 80%;
            box-shadow: 0px 9px 28px 8px #000000 85%;

        }
    }
</style>