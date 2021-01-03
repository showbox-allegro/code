
<template>
    <div class="edition scroll box">   
        <h4 class="box__title">Edycja</h4>
        <div v-if="!currentLink || !selected" class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
        <div v-else class="box__main">
            <s-temp
                v-if="currentLink.tempId"
                :temp="currentProject.templates.find(t=> t.id == currentLink.tempId)"
            />
            <template v-else>
                <s-temp 
                    v-for="temp in currentProject.templates"
                    :key="`temp ${temp.id}`"
                    :temp="temp"
                />
            </template>

            <s-prod
                v-if="currentLink.prodId"
                :prod="currentProject.products.find(t=> t.id == currentLink.prodId)"
            />
            <template v-else>
                <s-prod 
                    v-for="prod in currentProject.products"
                    :key="`prod ${prod.id}`"
                    :prod="prod"
                />
            </template>

            
        </div>
    </div>
</template>

<script>
import Temp from "./Temp";
import Prod from "./Prod";

export default {
    name: 'Edition',
    components: {
        STemp: Temp,
        SProd: Prod
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
        }

        & &__product:last-child {
            .ant-divider {
                display: none;
            }
        }

    }
</style>