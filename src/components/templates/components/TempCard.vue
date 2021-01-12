<template>
    <div class="card">
        <div class="card__top">
            <img class="card__img" src="@/assets/graphics/banner.png" />
        </div>
        <div class="card__bottom">
            <p class="card__title"> {{ temp.name }} </p>
            <p class="card__info">Opis szablonu: {{ temp.desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TempCard',
    props: {
        temp: Object
    }
}
</script>

<style lang="less">

</style>