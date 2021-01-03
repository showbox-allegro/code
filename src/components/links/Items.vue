
<template>
    <div class="items">   
        <div class="title">
            <h3>Powiązania</h3>
            <a-button type="default">
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        Eksportuj <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a href="javascript:;">Zaznaczone</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">Wszystko</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj" v-model="query"/>
        </div>
        <s-empty v-if="query && !filteredLinks.length"/>
        <ul v-else class="links__items">
            <s-item 
                v-for="(link, index) in filteredLinks" 
                class="links__item" 
                :key="link.id"
                :link="link"
                :index="index"
                :tempName="currentProject.templates.find(t=> t.id == link.tempId).name"
                :prodName="currentProject.products.find(p=> p.id == link.prodId).name"
                @editLink="$emit('editLink',link.id)"
                @resetSettings="$emit('resetSettings')"
                @deleteLink="$emit('deleteLink',link.id)"
            />  
        </ul>
    </div>
</template>

<script>
import Empty from "../layout/Empty";
import Item from "./Item";

export default {
    name: 'Items',
    props: {
        currentProject: Object
    },
    components: {
        SItem: Item,
        SEmpty: Empty
    },
    data(){
        return {
            query:""
        }
    },
    computed: {
        linksWithNames(){
            let links = this.currentProject.links;
            links.forEach (link => {
                const tempName = this.currentProject.templates.find(t=> t.id == link.tempId).name;
                const prodName = this.currentProject.products.find(p=> p.id == link.prodId).name;
                link.name = `${tempName} x ${prodName}`;
            })
            return links;
        },
        filteredLinks(){
            return this.query 
                ? 
                this.linksWithNames.filter(l=>l.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 )
                : 
                this.linksWithNames;
        }
    },

 
}
</script>

<style lang="less">
    .items {
        width: 50%;

        &__badge {
            margin-left: 4px;
            margin-right: 4px;
            margin-bottom: 2px;
        }

    }
</style>