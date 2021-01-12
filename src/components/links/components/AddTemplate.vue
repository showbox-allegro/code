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
            <ul v-else class="add-template__categories scroll">
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
                        <div class="add-template__content">
                            <div class="add-template__temps scroll">
                                <s-empty class="add-template__temps-empty" v-if="filtrTemp.query && !filteredTemps.length"/>
                                <ul v-else class="add-template__list">
                                    <s-temp-card 
                                        v-for="temp in filteredTemps" 
                                        :key="temp.id"
                                        :temp="temp"
                                        :is-selected="selectedTemps.findIndex(t=>t.id==temp.id)!=-1"
                                        @click.native="selectTemp(temp)"
                                    />
                                </ul>
                            </div>
                            <div class="add-template__preview scroll">
                                <p class="add-template__preview-empty" v-if="!selectedTemps.length">Zaznacz szablon, aby zobaczyć grafiki</p>
                                <div v-else>
                                    <img class="add-template__preview-img" width='410px' src="@/assets/graphics/banner.png"/>
                                    <img class="add-template__preview-img" width='310px' src="@/assets/graphics/banner.png"/>
                                    <img class="add-template__preview-img" width='240px' src="@/assets/graphics/banner.png"/>
                                </div>
                            </div>
                        </div>
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
                        </a-menu>
                    </a-dropdown>
                </a-tabs>

        </div>



        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeAddTemplateModal')">
                Zamknij
            </a-button>
            <a-button key="submit" type="primary" @click="$emit('addTemplates',selectedTemps)">
                Dodaj zaznaczone
            </a-button>
        </template>

    </a-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Empty from "../../layout/Empty";
import TempCard from "./TempCard";

export default {
    name: 'AddTemplate',
    components: {
        STempCard: TempCard,
        SEmpty: Empty
    },
    data(){
        return {
            visible: true,
            selectedCategory: null,
            selectedTemps: [],
            queryCateg: "",
            filtrTemp: {
                sort:"",
                query: ""
            },
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
                },
                {
                    id: 7,
                    name: "Kategoria 7"
                },
                {
                    id: 8,
                    name: "Kategoria 8"
                },
                {
                    id: 9,
                    name: "Kategoria 9"
                },
                {
                    id: 10,
                    name: "Kategoria 10"
                }
            ]
        }
    },
    computed: {
        ...mapState({
			temps: state => state.TemplatesModule.temps,
        }),
        filteredTemps(){
            let filtered = this.temps; 

            if(this.filtrTemp.query){
                filtered = this.temps.filter(p=>p.name.toLowerCase().indexOf(this.filtrTemp.query.toLowerCase()) !== -1 );
            }

            if(this.filtrTemp.sort=='name'){
                filtered.sort((a, b) => a.name.localeCompare(b.name))
            }

            return filtered
        },
        filteredCategories(){
            return this.queryCateg 
                ? 
                this.categories.filter(c=>c.name.toLowerCase().indexOf(this.queryCateg.toLowerCase()) !== -1 )
                : 
                this.categories;
        }
    },
    mounted(){
        if (!this.temps.length) {
            this.getTemps();
        }
    },
    methods: {
        ...mapActions(["getTemps"]),
        selectTemp(temp){
            const index = this.selectedTemps.findIndex(t=>t.id==temp.id);
            if( index==-1 ) {
                this.selectedTemps.push(temp);
            } else {
                this.selectedTemps.splice(index,1);
            }
        }
    }
}
</script>

<style lang="less">
    .add-template {

        .ant-modal {
            top:48px;
        }

        .ant-modal-wrap {
            overflow: hidden;
        }
  

        .ant-modal-body {
            display: flex;
            align-items: stretch;
            padding: 0;
            height: 100%;
        }

        &__sidebar {
            flex-shrink: 0;
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
            max-height: calc(100vh - 96px - 200px + 64px - 97px);
        }

        &__category {
            display: flex;
            align-items: center;
            padding: 0 24px;
            height: 40px;
            line-height: 40px;
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
            flex-shrink: 0;
            height: 100%;
            max-height: calc(100vh - 96px - 200px);
      
            width: 600px;
            background-color: @gray-1;
            border-right: solid 1px @gray-4;

            &-empty {
                margin: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

        &__list {
            display: flex;
            flex-wrap: wrap;
            padding: 16px;
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
            .ant-tabs {
                width: 100%;
                height: 100%;
            }
            .ant-tabs-content {
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

        &__content {
            display: flex;
            height: 100%;
        }

        &__preview {
            width: calc( 100% - 600px);
            max-height: calc(100vh - 96px - 200px);
            padding: 16px;
            &-img {
                max-width: 100%;
                margin-bottom: 16px;
            }
            &-empty {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: @gray-7;
            }
        }



    }
</style>