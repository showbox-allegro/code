
<template>
    <div>   
        <s-sidebar></s-sidebar>
        <div class="project__content">

            <s-edition></s-edition>

            <s-graphics></s-graphics>

        </div>
    </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Edition from "./Edition";
import Graphics from "./Graphics";

export default {
    name: 'Project',
    components: {
        SSidebar: Sidebar,
        SEdition: Edition,
        SGraphics: Graphics
    },
    data(){
        return {

        }
    },
 
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