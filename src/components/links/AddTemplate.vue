<template>
    <a-modal 
        v-model="visible"
        title="Dodaj szablony" 
        @ok="$emit('addTemplates')"
        @cancel="$emit('closeAddTemplateModal')"
    >
        <p class="infoModal__desc">TODO</p>

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeAddTemplateModal')">
                Zamknij
            </a-button>
            <a-button key="submit" type="primary" @click="$emit('addTemplates')">
                Dodaj zaznaczone
            </a-button>
        </template>

    </a-modal>
</template>

<script>
export default {
    name: 'AddTemplate',
    props: {
        templatesToAdd: Array,
    },
    data(){
        return {
            visible: true
        }
    },
}
</script>

<style lang="less">
    .infoModal {
        &__desc {
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;
        }

        &__input {
            margin-bottom: 8px;
        }
    }
</style>