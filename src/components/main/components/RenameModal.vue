<template>
    <a-modal 
        v-model="visible"
        title="Zmień nazwę projektu" 
        @ok="saveName"
        @cancel="$emit('closeRenameModal')"
    >
        <p class="form__label">Nazwa projektu</p>
        <a-input 
            class="form__input" 
            placeholder="Nazwa projektu" 
            v-model="newName"
        />

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeRenameModal')">
                Anuluj
            </a-button>
            <a-button key="submit" type="primary" @click="saveName">
                Zapisz
            </a-button>
        </template>

    </a-modal>
</template>

<script>
export default {
    props: {
        currentProject: Object,
    },
    data(){
        return {
            visible: true,
            newName: this.currentProject.name
        }
    },
    methods: {
        saveName(){
            this.currentProject.name = this.newName;
            this.$emit('renameProject');
        }
    }
}
</script>

<style lang="less">

</style>