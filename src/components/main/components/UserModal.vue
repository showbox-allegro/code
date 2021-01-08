<template>
    <a-modal 
        v-model="visible"
        title="Konto" 
        @cancel="$emit('closeUserModal')"
    >
        <p class="form__label">Imię</p>
        <a-input class="form__input" placeholder="Imię" />

        <p class="form__label">Nazwisko</p>
        <a-input class="form__input" placeholder="Nazwisko" />

        <template slot="footer">
            <a-button key="back" type="default" @click="$emit('closeUserModal')">
                Zamknij
            </a-button>
            <!-- <a-button key="submit" type="primary" @click="$emit('saveInfoData')">
                Zapisz
            </a-button> -->
        </template>

    </a-modal>
</template>

<script>
export default {
    name: 'UserModal',
    data(){
        return {
            visible: true
        }
    },
}
</script>

<style lang="less">

</style>