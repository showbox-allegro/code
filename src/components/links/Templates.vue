
<template>
    <div class="templates">   
        <div class="title">
            <h3>Szablony</h3>
            <a-button type="dashed">
                <a-icon type="plus"/>
                Dodaj
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj" v-model="query"/>
        </div>
        <s-empty v-if="!filteredTemplates.length"></s-empty>
        <ul class="links__items">
            <li 
                v-for="template in filteredTemplates" 
                :class="{'is-selected': template.id == selection}"
                class="links__item" 
                :key="template.id"
                @click="$emit('selectTemplate', template.id)"
            >
                Nazwa szablonu
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
    name: 'Templates',
    props: {
        selection: Number
    },
    components: {
        SEmpty: Empty
    },
    data(){
        return {
            query: "",
            templates: [
                {
                    id: 1,
                    name: "Nazwa szablonu"
                },
                {
                    id: 2,
                    name: "Nazwa szablonu"
                },
                {
                    id: 3,
                    name: "Nazwa szablonu"
                },
                {
                    id: 4,
                    name: "Nazwa szablonu"
                }
            ]
        }
    },
    computed: {
        filteredTemplates(){
            return this.query 
                ? 
                this.templates.filter(p=>p.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 )
                : 
                this.templates;
        }
    }

}
</script>

<style lang="less">
    .templates {
        width: 25%;
        border-right: solid 1px @gray-4;


    }
</style>