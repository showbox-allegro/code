
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
                :currentProject="currentProject"
                :currentLink="currentLink"
            />
            <s-graphics
                :selected="!!selection.link.length"
                @exportSelectedGraphics="exportSelectedGraphics"
                @exportAllCreations="exportAllCreations"
                @exportAllLinks="exportAllLinks"
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
import { mapMutations } from "vuex";
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
            selection: {
                link: []
            }
        }
    },
    computed: {
        currentLink(){
            let selected = this.selection.link;
            if (selected.length && selected[0]){
                return this.currentProject.links.find(l=>l.id==selected[0])
            } else {
                return {}
            }
        }
    },
    methods: {
        ...mapMutations(["showAlert"]),
        openLinks(){
            this.linksEditor = true;
        },
        closeLinks(id) {
            this.linksEditor = false;
            if(id || id===0) this.selectLink(id);
        },
        selectLink(id){
            this.selection.link=[id];
            // this.currentLink = this.currentProject.links.find(l=>l.id==id);
        },
        exportSelectedGraphics(){
            //TODO:
            this.showAlert({text: 'Eksportowano zaznaczone grafiki', type: 'success'})
        },
        exportAllCreations(){
            //TODO:
            this.showAlert({text: 'Eksportowano wszystkie kreacje', type: 'success'})
        },
        exportAllLinks(){
            //TODO:
            this.showAlert({text: 'Eksportowano wszystkie Powiązania', type: 'success'})
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