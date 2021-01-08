
<template>
    <div class="templates">   
        <div class="title">
            <h3>Szablony</h3>
            <a-button type="dashed" @click="addTemplateModal=true">
                <a-icon type="plus"/>
                Dodaj
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj" v-model="query"/>
        </div>
        <s-empty v-if="query && !filteredTemplates.length"></s-empty>
        <ul class="links__items">
            <s-template 
                v-for="template in filteredTemplates" 
                :template="template"
                :class="{'is-selected': template.id == selection}"
                class="links__item" 
                :key="template.id"
                @selectTemplate="$emit('selectTemplate', template.id)"
                @deleteTemplate="$emit('deleteTemplate', template.id)"
            />
        </ul>
        <s-add-template 
            v-if="addTemplateModal"
            @addTemplates = "addTemplates"
            @closeAddTemplateModal = "addTemplateModal = false"
        />
    </div>
</template>

<script>
import Empty from "../../layout/Empty";
import Template from "./Template";
import AddTemplate from "./AddTemplate";

export default {
    name: 'Templates',
    props: {
        selection: Number,
        templates: Array
    },
    components: {
        STemplate: Template,
        SAddTemplate: AddTemplate,
        SEmpty: Empty
    },
    data(){
        return {
            query: "",
            addTemplateModal: false,
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
    },
    methods: {
        addTemplates(templates){
            this.addTemplateModal = false;
            this.$emit('addTemplates',templates);
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