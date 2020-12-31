<template>
    <div class="card">
        <div class="card__top">
        </div>
        <div class="card__bottom">
            <p class="card__title"> {{ project.name }} </p>
            <p class="card__info">Ostatnio edytowany:</p>
            <p class="card__info"> {{ project.updated }}</p>
            <a-dropdown class="card__options">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-icon type="more" />
                </a>
                <a-menu slot="overlay">
                    <a-menu-item @click="$emit('editProject')">
                        <span><a-icon type="edit" /> Edytuj</span>
                    </a-menu-item>
                    <a-menu-item>
                        <span><a-icon type="copy" /> Duplikuj</span>
                    </a-menu-item>
                    <a-menu-item>
                        <span><a-icon type="code" /> Informacje</span>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item>
                        <span class="danger"><a-icon type="delete" /> Usuń</span>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
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

        &:hover {
            border: solid 1px @gray-6;
            .card__options {
                display: block;
            }
        }

        &__top {
            width: 100%;
            height: 200px;
            background-color: @gray-2;
            // border-radius: 6px 6px 0px 0px;
        }

        &__bottom {
            position: relative;
            padding: 24px;
            width: 100%;
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

        &__options {
            position: absolute;
            right: 16px;
            bottom: 16px;
            padding: 8px;
            display: none;
        }
    }
</style>