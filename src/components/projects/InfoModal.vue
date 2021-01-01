<template>
    <a-modal 
        v-model="visible"
        title="Informacje" 
        @ok="$emit('saveInfoData')"
        @cancel="$emit('closeInfoModal')"
    >
        <p class="infoModal__desc">Analitic Tag</p>
        <a-input class="infoModal__input" placeholder="Analitic Tag" />
        <p class="infoModal__desc">Opis</p>
        <a-textarea class="infoModal__input" placeholder="Opis" :rows="3"/>
        <p class="infoModal__desc">Alternatywny opis obrazka</p>
        <a-input class="infoModal__input" placeholder="Alternatywny opis obrazka" />

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeInfoModal')">
                Anuluj
            </a-button>
            <a-button key="submit" type="primary" @click="$emit('saveInfoData')">
                Zapisz
            </a-button>
        </template>

    </a-modal>
</template>

<script>
export default {
    props: {
        infoData: Object,
        infoModal: Boolean
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