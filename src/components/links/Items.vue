
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
                        <a-menu-item @click="$emit('exportLinks',selectedLinks)" :disabled="!selectedLinks.length">
                            <p>Zaznaczone</p>
                        </a-menu-item>
                        <a-menu-item @click="$emit('exportLinks')">
                            <p>Wszystko</p>
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
                @toggleSelect="toggleSelectLink(link.id)"
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
            query:"",
            selectedLinks: []
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
    methods: {
        toggleSelectLink(id){
            const index = this.selectedLinks.findIndex(l => l === id);
            if (index !== -1) {
                this.selectedLinks.splice(index, 1);
            } else {
                this.selectedLinks.push(id);
            }
        }
    }

 
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