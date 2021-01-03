
<template>
    <div class="graphics box">   
        <h3 class="box__title">Grafiki - todo</h3>
        <div class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Graphics',
    data(){
        return {

        }
    },
 
}
</script>

<style lang="less">
    .graphics {
        width: calc(50% - 8px);
    }
</style>