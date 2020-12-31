<template>

    <a-empty class="empty" :image="simpleImage">
        <span class="empty__text" slot="description"> Brak wyników</span>
    </a-empty>

</template>

<script>
import { Empty } from 'ant-design-vue';

export default {
    beforeCreate() {
        this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    },
}
</script>
  
<style lang="less">
    .empty {
        &__text {
            color: @gray-7;
        }

        .ant-empty-image {
            opacity: 0.2;
        }
    }
  </style>
