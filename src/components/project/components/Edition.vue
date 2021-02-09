
<template>
    <div class="edition scroll">   
        <h4 class="edition__title box__title">Edycja</h4>
        <div v-if="!currentLink || !selected" class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
        <div v-else>
            <s-edit-temp
                class="edition__box"
                v-if="currentLink.tempId"
                :temp="currentProject.templates.find(t=> t.id == currentLink.tempId)"
            />
            <template v-else>
                <!-- <a-tabs  
                    :default-active-key="`temp ${currentProject.templates[0].id}`" 
                > 
                    <a-tab-pane 
                        v-for="temp in currentProject.templates" 
                        :key="`temp ${temp.id}`" 
                        :tab="temp.name"
                    > -->
                        <s-edit-temp   
                            class="edition__box"                          
                            :temp="temp"
                            v-for="temp in currentProject.templates" 
                            :key="`temp ${temp.id}`" 
                        />
                    <!-- </a-tab-pane>
                </a-tabs> -->
            </template>

            <s-edit-prod
                class="edition__box"
                v-if="currentLink.prodId"
                :prod="currentProject.products.find(t=> t.id == currentLink.prodId)"
            />
            <template v-else>
                <!-- <a-tabs 
                    :default-active-key="`prod ${currentProject.products[0].id}`" 
                >
                    <a-tab-pane 
                        v-for="prod in currentProject.products"
                        :key="`prod ${prod.id}`"
                        :tab="prod.name"
                    > -->
                        <s-edit-prod 
                            class="edition__box"
                            :prod="prod"
                            v-for="prod in currentProject.products"
                            :key="`prod ${prod.id}`"
                        />
                    <!-- </a-tab-pane>
                </a-tabs> -->
            </template>

            
        </div>
    </div>
</template>

<script>
import EditTemp from "./EditTemp";
import EditProd from "./EditProd";

export default {
    name: 'Edition',
    components: {
        SEditTemp: EditTemp,
        SEditProd: EditProd
    },
    props: {
        selected: Boolean,
        currentProject: Object,
        currentLink: Object
    },
    data(){
        return {

        }
    },
 
}
</script>

<style lang="less">
    .edition {
        width: calc(50% - 8px);
        margin-right: 16px;
        height: calc(100vh - 64px - 16px - 24px);

        &__header {
            font-weight: 600;
            margin-bottom: 16px;
            margin-top: 12px;
        }

        &__input {
            margin-bottom: 16px;
        }

        &__font {
            display: flex;
            justify-content: space-between;

            &-size {
                flex-grow: 1;
                margin-right: 16px;
            }
            &-color {
                width: 200px;
            }
        }

        &__image {

        }

        &__select {
            width: 100%;
            margin-bottom: 16px;
        }

        & &__product:last-child {
            .ant-divider {
                display: none;
            }
        }

        .ant-tabs-bar {
            margin-bottom: 32px;
            border-bottom-color: @gray-4;
        }

        &__box {
            padding: 16px;
            background-color: @gray-2;
            border: 1px solid @gray-4;
            border-radius: 6px;
            margin-bottom: 16px;

            &:first-child {
                border-radius: 0px 0px 6px 6px;
                border-top: none;
            }

            &:last-child {
                margin-bottom: 0px;
            }
        }

        &__title {
            background-color: @gray-2;
            border: 1px solid @gray-4;
            border-radius: 6px 6px 0px 0px;
        }

    }
</style>