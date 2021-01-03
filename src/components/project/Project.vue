
<template>
    <div>         
        <s-sidebar     
            @openLinks="openLinks"
            @selectLink="selectLink"
            :currentProject="currentProject"
            :selection="selection"
        />

        <div class="project__content">
            <s-edition
                :selected="!!selection.link.length"
                :temp="currentProject.templates.find(t=> t.id == currentLink.tempId)"
                :prod="currentProject.products.find(p=> p.id == currentLink.prodId)"
            />
            <s-graphics
            />
        </div>

        <s-links 
            v-if="linksEditor"
            @closeLinks="closeLinks"
            :currentProject="currentProject"
        />

    </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Edition from "./Edition";
import Graphics from "./Graphics";
import Links from "../links/Links";

export default {
    name: 'Project',
    components: {
        SSidebar: Sidebar,
        SEdition: Edition,
        SGraphics: Graphics,
        SLinks: Links
    },
    props: {
        currentProject: Object
    },
    data(){
        return {
            linksEditor: false,
            currentLink: {},
            selection: {
                link: []
            }
        }
    },
    methods: {
        openLinks(){
            this.linksEditor = true;
        },
        closeLinks(id) {
            this.linksEditor = false;
            if(id) this.selectLink(id);
        },
        selectLink(id){
            this.selection.link=[id];
            this.currentLink = this.currentProject.links.find(l=>l.id==id);
        }
    }
 
}
</script>

<style lang="less">
    .project {
        &__content {
            
            padding-top: 16px;
            margin-left: 60px;
            display: flex;
        }
    }
</style>