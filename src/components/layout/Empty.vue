<template>

    <a-empty class="empty" :image="simpleImage" :class="{'is-xl': size=='xl'}">
        <span class="empty__text" slot="description"> Brak wyników</span>
    </a-empty>

</template>

<script>
import { Empty } from 'ant-design-vue';

export default {
    name: 'Empty',
    props: {
        size: {
            type: String,
            default: 'normal'
        }
    },
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

        &.is-xl {
            .empty__text {
                font-size: 18px;
            }
            .ant-empty-image {
                height: 160px;
                svg {
                    width: 200px;
                    height: 160px;
                }
            }
        }
    }
  </style>
