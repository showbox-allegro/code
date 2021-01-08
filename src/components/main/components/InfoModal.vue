<template>
    <a-modal 
        v-model="visible"
        title="Informacje" 
        @ok="$emit('saveInfoData')"
        @cancel="$emit('closeInfoModal')"
    >
        <p class="form__label">Analitic Tag</p>
        <a-input class="form__input" placeholder="Analitic Tag" />

        <p class="form__label">Opis</p>
        <a-textarea class="form__input" placeholder="Opis" :rows="3"/>

        <p class="form__label">Alternatywny opis obrazka</p>
        <a-input class="form__input" placeholder="Alternatywny opis obrazka" />

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
    },
    data(){
        return {
            visible: true
        }
    },
}
</script>

<style lang="less">

</style>