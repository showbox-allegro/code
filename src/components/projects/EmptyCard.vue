<template>
    <div class="empty-card">
        <span class="empty-card__plus">
            <a-icon type="plus"/>
        </span>
        Dodaj nowy projekt
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less">
    .empty-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 325px;
        border: dashed 1px @gray-4;
        border-radius: 6px;
        cursor: pointer;
        color: @gray-7;

        &:hover {
            text-decoration: underline;
        }

        &__plus {
            margin-bottom: 8px;
            color: @gray-9;

            svg {
                width: 24px;
                height: 24px;
            }
        }
    }
</style>