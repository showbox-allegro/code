
<template>
    <div class="edition box">   
        <h3 class="box__title">Edycja</h3>
        <div class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Edition',
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