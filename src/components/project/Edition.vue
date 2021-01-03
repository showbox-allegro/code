
<template>
    <div class="edition box">   
        <h3 class="box__title">Edycja</h3>
        <div v-if="!selected" class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
        <div v-else class="box__main">
            TODO:
            <p> {{ temp.name }} </p>
            <p> {{ prod.name }} </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Edition',
    props: {
        selected: Boolean,
        temp: Object,
        prod: Object
    },
    data(){
        return {

        }
    },
 
}
</script>

<style lang="less">
    .edition {
        width: calc(50% - 8px);
        margin-right: 16px;
        min-height: calc(100vh - 64px - 16px - 24px);
    }
</style>