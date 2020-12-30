
<template>
    <div>   

        

        <s-sidebar     
            @openLinks="openLinks"
        />

        <div class="project__content">

            <s-edition></s-edition>

            <s-graphics></s-graphics>

        </div>


        <s-links 
            v-if="linksEditor"
            @closeLinks="closeLinks"
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
    data(){
        return {
            linksEditor: false
        }
    },
    methods: {
        openLinks(){
            this.linksEditor = true;
        },
        closeLinks() {
            this.linksEditor = false;
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