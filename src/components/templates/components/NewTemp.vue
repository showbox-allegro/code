<template>
    <a-modal 
        v-model="visible"
        title="Dodaj szablon" 
        @ok="createTemp"
        @cancel="$emit('closeNewTempModal')"
    >
        <p class="form__label">Nazwa szablonu</p>
        <a-input class="form__input" placeholder="Nazwa szablonu" v-model="name" />

        <p class="form__label">Opis</p>
        <a-textarea class="form__input" placeholder="Opis" :rows="3" v-model="desc"/>

        <p class="form__label">Kategoria</p>
        <a-select class="newTemp__select" placeholder="Select">
            <a-select-option v-for="i in 10" :key="i" >
                Opcja {{ i }}
            </a-select-option>
        </a-select>

        <p class="form__label">Słowa kluczowe</p>
        <a-input class="form__input" placeholder="Słowa kluczowe" v-model="keywords"/>

        <p class="form__label">Szablon</p>
        <s-zip-upload />

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeNewTempModal')">
                Anuluj
            </a-button>
            <a-button key="submit" type="primary" @click="createTemp">
                Dodaj
            </a-button>
        </template>

    </a-modal>
</template>

<script>
import ZipUpload from "./ZipUpload";

export default {
    name: 'NewTemp',
    components: {
        SZipUpload: ZipUpload
    },
    data(){
        return {
            visible: true,
            name: "",
            desc: "",
            categoryId: "",
            keywords: "",
            file: ""
        }
    },
    methods: {
        createTemp(){
            const newTemp = {
                name: this.name,
                desc: this.desc,
                categoryId: this.categoryId,
                keywords: this.keywords,
                file: this.file
            }
            this.$emit('createTemp',newTemp);
        }
    }

}
</script>

<style lang="less">
.newTemp {

    &__select {
        width: 100%;
        margin-bottom: 8px;
    }
}
</style>