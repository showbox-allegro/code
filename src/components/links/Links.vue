
<template>
    <div class="links">   
        <div class="title">
            <p>Edycja powiązań</p>
            <a-icon 
                type="close" 
                :style="{ fontSize: '20px', cursor: 'pointer', padding: '8px'}"
                @click="$emit('closeLinks')"
            />
        </div>
        <div class="links__main scroll">
            <s-templates 
                :selection="selection.template"
                :templates="currentProject.templates"
                @selectTemplate="selectTemplate"
                @deleteTemplate="confirmAndDeleteTemplate"
                @addTemplates="addTemplates"
            />
            <s-products 
                :selection="selection.product"
                :products="currentProject.products"
                @selectProduct="selectProduct"
                @deleteProduct="confirmAndDeleteProduct"
                @addProducts="addProducts"
                @addEmptyProducts="addEmptyProducts"
            />
            <s-items
                :currentProject="currentProject"
                @editLink="editLink"
                @resetSettings="resetSettings"
                @deleteLink="deleteLink"
                @exportLinks="exportLinks"
            />
            <div class="links__info links__info--2" v-if="infoText">
                <p>{{ infoText }}</p>
            </div>
            <div class="links__info" v-if="linkReady">
                <p>
                    <span class="links__info--name"> {{ selectedTemplate }} </span> 
                    z 
                    <span class="links__info--name"> {{ selectedProduct }} </span>
                </p>
                <a-button @click="makeLink" type="primary">
                    <a-icon type="build" />
                    Powiąż
                </a-button>
            </div>
        </div>
        <div class="links__bottom">
            <a-button type="primary" @click="saveAndClose">Zapisz i zamknij</a-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Modal } from 'ant-design-vue';
import Templates from "./Templates";
import Products from "./Products";
import Items from "./Items";

export default {
    name: 'Links',
    components: {
        STemplates: Templates,
        SProducts: Products,
        SItems: Items
    },
    props: {
        currentProject: Object
    },
    data(){
        return {
            selection: {
                template: null,
                product: null
            }
        }
    },
    computed: {
        infoText(){
            if(!this.currentProject.templates.length && !this.currentProject.products.length){
                return "Dodaj Szablony i Produkty, aby utworzyć powiązanie"
            } else if(!this.currentProject.templates.length){
                return "Dodaj Szablony, aby utworzyć powiązanie"
            } else if (!this.currentProject.products.length) {
                return "Dodaj Produkty, aby utworzyć powiązanie"
            } else if (!this.selection.template && !this.selection.product) {
                return "Zaznacz Szablon i Produkt, aby utworzyć powiązanie"
            } else if (!this.selection.template) {
                return "Zaznacz Szablon, aby utworzyć powiązanie z wybranym produktem"
            } else if (!this.selection.product) {
                return "Zaznacz Produkt, aby utworzyć powiązanie z wybranym szablonem"
            } else {
                return ""
            }
        },

        linkReady(){
            return this.selection.template && this.selection.product
        },
        selectedTemplate(){
            return this.selection.template ? this.currentProject.templates.find(t=> t.id == this.selection.template).name : ""
        },
        selectedProduct(){
            return this.selection.product ? this.currentProject.products.find(t=> t.id == this.selection.product).name : ""
        }
    },
    methods: {
        ...mapMutations(["showAlert"]),
        ...mapActions(["updateProject","addProject"]),
        selectTemplate(id) {
            this.selection.template == id ? this.selection.template = null : this.selection.template = id;
        },
        selectProduct(id) {
            this.selection.product == id ? this.selection.product = null : this.selection.product = id;
        },
        confirmAndDeleteTemplate(id){
            Modal.confirm({
                title: 'Usunąć szablon?',
                content: 'Utracisz wszystkie powiązania, w których wykorzystano szablon',
                cancelText: 'Anuluj',
                okText: 'Usuń',
                icon: 'exclamation-circle',
                onOk: () => {
                    this.deleteTemplate(id);
                }
            }); 
        },
        deleteTemplate(id) {
            const index = this.currentProject.templates.findIndex(t => t.id === id);

            if (index !== -1) {
                this.currentProject.templates.splice(index, 1);
            }

            if(this.selection.template==id){
                this.selection.template=null;
            }

            this.currentProject.links.forEach((link,i)=>{
                if (link.tempId==id) {
                    this.currentProject.links.splice(i, 1);
                }
            });
        },
        confirmAndDeleteProduct(id){
            Modal.confirm({
                title: 'Usunąć produkt?',
                content: 'Utracisz wszystkie powiązania, w których wykorzystano produkt',
                cancelText: 'Anuluj',
                okText: 'Usuń',
                icon: 'exclamation-circle',
                onOk: () => {
                    this.deleteProduct(id);
                }
            }); 
        },
        deleteProduct(id) {
            const index = this.currentProject.products.findIndex(p => p.id === id);

            if (index !== -1) {
                this.currentProject.products.splice(index, 1);
            }

            if(this.selection.product==id){
                this.selection.product=null;
            }

            this.currentProject.links.forEach((link,i)=>{
                if (link.prodId==id) {
                    this.currentProject.links.splice(i, 1);
                }
            });
        },
        deleteLink(id) {
            const index = this.currentProject.links.findIndex(l => l.id === id);

            if (index !== -1) {
                this.currentProject.links.splice(index, 1);
            }
        },
        makeLink(){
            const newLinkId = this.currentProject.links.length ? this.currentProject.links.slice(-1)[0].id+1 : 1;
            const newLink = {
                id: newLinkId,
                tempId: this.selection.template,
                prodId: this.selection.product,
            }
            this.currentProject.links.push(newLink);
            this.selection = {                
                template: null,
                product: null
            }
        },
        addEmptyProducts(number){
            for (let i = 0; i < number; i++) {
                this.addEmptyProduct();
            }
        },
        addProducts(products){
            console.log(products);
            this.currentProject.products = this.currentProject.products.concat(products);
        },
        addEmptyProduct(){
            const newProduktId = this.currentProject.products.length ? this.currentProject.products.slice(-1)[0].id+1 : 1;
            const newProduct = {
                id: newProduktId,
                name: `Produkt ${newProduktId}`,
                image: "pills.png"
            }
            this.currentProject.products.push(newProduct);
        },
        addTemplates(templates){
            this.currentProject.templates = this.currentProject.templates.concat(templates);
        },
        editLink(id){
            this.saveProject();
            this.$emit('closeLinks',id);

        },
        resetSettings(){
            Modal.confirm({
                title: 'Zresetować ustawienia?',
                content: 'Utracisz wszystkie zmiany w danym powiązaniu.',
                cancelText: 'Anuluj',
                okText: 'Resetuj',
                icon: 'exclamation-circle',
                onOk: () => {
                    //TODO:
                    this.showAlert({text: 'Zresetowano ustawienia', type: 'success'})
                }
            }); 
        },
        exportLinks(linksToExport){
            if(linksToExport) {
                //TODO:
                this.showAlert({text: 'Eksportowano zaznaczone linki', type: 'success'})
            } else {
                //TODO:
                this.showAlert({text: 'Eksportowano wszystkie linki', type: 'success'})
            }
        },
        saveAndClose(){
            this.saveProject(this.currentProject);
            this.$emit('closeLinks');
        },
        autoSaveProject(){
            //TODO:
        },
        saveProject(){
            //TODO:
            if(this.currentProject.id){
                this.updateProject(this.currentProject);
            } else {
                this.addProject(this.currentProject);
            }
        }
    }
 
}
</script>

<style lang="less">
    .links {
        position: absolute;
        top: 64px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        // height: 100%;
        background-color: @gray-1;
        z-index: 3;

        &__main {
            display: flex;
            height: calc(100% - 64px - 48px);
        }

        &__search {
            background-color: @gray-2;
            padding: 12px 16px;
        }

        &__items {
            padding: 16px;
        }

        &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            padding: 0px 16px;
            background-color: @gray-2;
            border: 1px solid @gray-4;
            border-radius: 6px;
            font-weight: 400;
            margin-bottom: 4px;
            cursor: pointer;

            .anticon {display: none;}

            &:hover {
                border: 1px solid @gray-6;

                .anticon {
                    padding: 8px;
                    display: block;
                }
            }

            &.is-selected {
                background-color: @primary-1;
                border-color: @primary-7;
            }
        }

        &__bottom {
            padding: 0px 24px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 48px;
            background-color: @gray-2;
            border-top: solid 1px @gray-4;
        }

        &__info {
            width: calc(50% - 32px);
            position: absolute;
            left: 16px;
            bottom: 64px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px;
            background-color: @gray-2;
            border-radius: 6px;
            box-shadow: 0px 3px 6px -4px #000000;
            box-shadow: 0px 6px 16px 0px #000000 80%;
            box-shadow: 0px 9px 28px 8px #000000 85%;
            color: @gray-9;
            font-weight: 400;

            &--name {
                font-weight: 600;
            }

            &--2 {
                height: 40px;
                justify-content: center;
            }

        }
    }
</style>