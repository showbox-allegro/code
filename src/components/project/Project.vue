
<template>
    <div class="project">         
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
                @editBanner="bannerEditor=true"
            />
        </div>

        <s-links 
            v-if="linksEditor"
            @closeLinks="closeLinks"
            @saveProject="$emit('saveProject')"
            :currentProject="currentProject"
        />

        <s-banner 
            v-if="bannerEditor"
            :banner="{}"
            @closeBanner="bannerEditor=false"
        />

    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Sidebar from "./components/Sidebar";
import Edition from "./components/Edition";
import Graphics from "./components/Graphics";
import Links from "../links/Links";
import Banner from "../banner/Banner";

export default {
    name: 'Project',
    components: {
        SSidebar: Sidebar,
        SEdition: Edition,
        SGraphics: Graphics,
        SLinks: Links,
        SBanner: Banner
    },
    props: {
        currentProject: Object
    },
    data(){
        return {
            linksEditor: false,
            bannerEditor: false,
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
        .ant-upload-list-picture-card .ant-upload-list-item-actions {
            z-index: 2;
        }
    }
</style>