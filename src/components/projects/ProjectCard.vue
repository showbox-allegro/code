<template>
    <div class="card">
        <div class="card__top">
        </div>
        <div class="card__bottom">
            <p class="card__title"> {{ project.name }} </p>
            <p class="card__info">Ostatnio edytowany:</p>
            <p class="card__info"> {{ project.updated }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        project: Object
    }
}
</script>

<style lang="less">
    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        min-height: 325px;
        border: solid 1px @gray-4;
        border-radius: 6px;
        cursor: pointer;

        &__top {
            width: 100%;
            height: 200px;
            background-color: @gray-2;
            // border-radius: 6px 6px 0px 0px;
        }

        &__bottom {
            padding: 24px;
        }

        &__title {
            margin-bottom: 8px;
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
            color: @gray-9;
        }

        &__info {
            line-height: 22px;
            font-weight: 400;
            color: @gray-7;
        }
    }
</style>