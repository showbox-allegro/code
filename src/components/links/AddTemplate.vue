<template>
    <a-modal 
        class="add-template"
        v-model="visible"
        title="Dodaj szablony" 
        @ok="$emit('addTemplates')"
        @cancel="$emit('closeAddTemplateModal')"
        :width="1290"
    >
        <div class="add-template__sidebar">
            <div class="add-template__sidebar-header">
                <p class="add-template__sidebar-title">Kategorie</p>
                <a-input-search v-model="queryCateg" class="add-template__sidebar-search" placeholder="Szukaj"/>
            </div>
            <s-empty v-if="queryCateg && !filteredCategories.length"/>
            <ul v-else class="add-tempalte__categories scroll">
                <li 
                    v-for="category in filteredCategories" 
                    :key="category.id" 
                    :class="{'is-selected': selectedCategory==category.id}"
                    class="add-template__category"
                    @click="selectedCategory=category.id"
                >
                    {{ category.name }}
                </li>
            </ul>
        </div>
        <div class="add-template__main">

                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" tab="Produktowe">
                        <ul class="add-template__temps scroll">
                            <s-temp-card 
                                v-for="temp in temps" 
                                :key="temp.id"
                                :temp="temp"
                            />
                        </ul>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Generyki" force-render>
                        Content of Tab Pane 2
                    </a-tab-pane>
                    <a-input-search class="add-template__main-search" slot="tabBarExtraContent" v-model="filtrTemp.query" placeholder="Szukaj"/>
                    <a-dropdown slot="tabBarExtraContent">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <p class="add-template__main-sort">Sortuj wg <a-icon type="down" /></p>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item @click="filtrTemp.sort='name'">
                                <p>Nazwa</p>
                            </a-menu-item>
                            <a-menu-item @click="filtrTemp.sort='created'">
                                <p>Data utworzenia</p>
                            </a-menu-item>
                            <a-menu-item @click="filtrTemp.sort='updated'">
                                <p>Data edycji</p>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-tabs>

        </div>

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeAddTemplateModal')">
                Zamknij
            </a-button>
            <a-button key="submit" type="primary" @click="$emit('addTemplates')">
                Dodaj zaznaczone
            </a-button>
        </template>

    </a-modal>
</template>

<script>
import Empty from "../layout/Empty";
import TempCard from "./TempCard";

export default {
    name: 'AddTemplate',
    components: {
        STempCard: TempCard,
        SEmpty: Empty
    },
    props: {
        templatesToAdd: Array,
    },
    data(){
        return {
            visible: true,
            selectedCategory: null,
            queryCateg: "",
            filtrTemp: {
                sort:"",
                query: ""
            },
            temps: [
                {
                    id: 1,
                    name: "Szablon 1",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 2,
                    name: "Szablon 2",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 3,
                    name: "Szablon 3",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 4,
                    name: "Szablon 4",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 5,
                    name: "Szablon 5",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 6,
                    name: "Szablon 6",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 7,
                    name: "Szablon 7",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 8,
                    name: "Szablon 8",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                },
                {
                    id: 9,
                    name: "Szablon 9",
                    desc: "Stworzony na potrzeby kampanii X dla produktu Y",
                    img: "",
                    categoryId: 1
                }
            ],
            categories: [
                {
                    id: 1,
                    name: "Kategoria 1"
                },
                {
                    id: 2,
                    name: "Kategoria 2"
                },
                {
                    id: 3,
                    name: "Kategoria 3"
                },
                {
                    id: 4,
                    name: "Kategoria 4"
                },
                {
                    id: 5,
                    name: "Kategoria 5"
                },
                {
                    id: 6,
                    name: "Kategoria 6"
                }
            ]
        }
    },
    computed: {
        filteredCategories(){
            return this.queryCateg 
                ? 
                this.categories.filter(c=>c.name.toLowerCase().indexOf(this.queryCateg.toLowerCase()) !== -1 )
                : 
                this.categories;
        }
    }
}
</script>

<style lang="less">
    .add-template {

        max-height: 80%;

        .ant-modal-body {
            display: flex;
            padding: 0;
        }

        &__sidebar {
            position: relative;
            width: 233px;
            background-color: @gray-2;
            border-right: solid 1px @gray-4;

            &-header {
                padding: 16px 24px;
                border-bottom: solid 1px @gray-4;
            }

            &-title {
                margin-bottom: 8px;
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
                color: @gray-10;
            }

            &-search {

            }
        }

        &__categories {

        }

        &__category {
            display: flex;
            align-items: center;
            padding: 0 24px;
            height: 40px;
            line-height: 400;
            opacity: 0.65;
            cursor: pointer;
            &:hover {
                opacity: 1;
            }
            &.is-selected{
                background-color: @primary-6;
                opacity: 1;
            }
        }

        &__temps {
            display: flex;
            flex-wrap: wrap;
            padding: 16px;
            width: 50%;
            background-color: @gray-1;
            border-right: solid 1px @gray-4;
        }



        &__main {
            width: 100%;
            // padding: 0 16px;
            &-search {
                width: 477px;

            }
            &-sort {    
                margin-left: 32px;            
                font-weight: 400;
                color: @gray-9;
                font-size: 14px;
            }
            .ant-dropdown-menu {
                margin-top: -16px;
            }
        }


        .ant-tabs {
            width: 100%;
            height: 100%;
        }

        .ant-tabs-extra-content {
            display: flex;
            align-items: center;
            line-height: 64px;
        }

        .ant-tabs-bar {
            padding: 0 16px;
            margin: 0px;
            background-color: @gray-2;
            border-bottom: none;
        }

        .ant-tabs-nav-container {
            font-size: 16px;
            line-height: 40px;
        }
    }
</style>