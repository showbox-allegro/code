<template>
    <li class="temp-card">
        <div class="temp-card__top">
            <img class="temp-card__img" src="@/assets/graphics/banner.png"/>
        </div>
        <div class="temp-card__bottom">
            <p class="temp-card__title">{{temp.name}}</p>
            <p class="temp-card__desc">Opis szablonu: {{temp.desc}}</p>
        </div>
    </li>
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
.temp-card {
    &:nth-child(2n+1){
        margin-right: 16px;
    }
    margin-bottom: 16px;
    width: calc(50% - 8px);
    background-color: @gray-2;
    border: solid 1px @gray-4;
    border-radius: 6px;

    &__img {
        width: 100%;
    }

    &__top {
        padding: 16px;
        height: 180px;
    }

    &__bottom {
        padding: 16px;
        background-color: @gray-1;
    }

    &__title {
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        color: @gray-9;
    }

    &__desc {

    }


}
</style>