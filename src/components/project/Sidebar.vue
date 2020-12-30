<template>
    <div class="sidebar" :class="{'is-collapsed': collapsed}">
        <div class="sidebar__header" @click="toggleCollapsed" >
            <p v-if="!collapsed">Powiązania</p>
            <a-icon 
                :type="collapsed ? 'menu-unfold' : 'menu-fold'" 
                :style="{fontSize: '20px'}"
            />
        </div>
        <div class="sidebar__content">
            <a-menu
                :default-selected-keys="['1']"
                :default-open-keys="['2']"
                mode="inline"
                theme="dark"
                :inline-collapsed="collapsed"
                class="sidebar__menu"
                v-if="list.length"
                >
                <template v-for="item in list">
                    <a-menu-item :key="item.key" class="sidebar__item">
                        <a-badge 
                            class="sidebar__badge"
                            :count="item.key" 
                        />
                        <span 
                            class="sidebar__name" 
                            >
                            {{ item.title }}
                        </span>
                    </a-menu-item>
                </template>
            </a-menu>
            <div class="sidebar__empty" v-else>
                <p v-if="!collapsed">Dodaj powiązania, aby rozpocząć! </p>
            </div>
            <div class="sidebar__bottom">
                <a-button class="sidebar__bottom--btn" type="primary">
                    <a-icon type="plus"></a-icon> 
                    <span v-if="!collapsed">Dodaj / Edytuj Powiązania</span>
                </a-button>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {

    data() {
        return {
            collapsed: false,
            list: [
                // {
                //     key: '1',
                //     title: 'Nazwa powiązania',
                // },
                // {
                //     key: '2',
                //     title: 'Nazwa powiązania',
                // },
                // {
                //     key: '3',
                //     title: 'Nazwa powiązania',
                // },
                // {
                //     key: '4',
                //     title: 'Nazwa powiązania',
                // },
                // {
                //     key: '5',
                //     title: 'Nazwa powiązania',
                // },
            ],
        };
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
    },
}
</script>

<style lang="less">

    .sidebar {
        position: absolute;
        top: 64px;
        bottom: 0px;
        left: 0px;
        width: 480px;
        // height: 100%;
        background-color: @gray-1;
        border-right: solid 1px @gray-4;
        transition: width 0.3s ease-in-out;


        &::after {
            content: "";
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 480px;
            width: calc(100vw - 480px);
            background-color: #000;
            transition: all 0.3s ease-in-out;
            opacity: 0.8;
        }

        &.is-collapsed {
            width: 64px;

            &::after {
                width: 0px;
                left: 64px;
                opacity: 0;
            }
        }


        &__empty {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: @gray-7;
            font-size: 16px;
            line-height: 24px;
            font-weight: 400;
            // text-decoration: underline;
            cursor: pointer;

        }

        &__content {
            background-color: @gray-1;
            height: calc(100% - 64px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__bottom {
            display: flex;
            align-items: center;
            background-color: @gray-2;
            height: 64px;
            padding: 0px 16px;
            box-shadow: 0px 1px 0px 0px @gray-4 inset;

            &--btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

        }

        &__header {
            
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 16px;
            font-size: 16px;
            font-weight: 600;
            height: 64px;
            background-color: @gray-2;
            cursor: pointer;
            box-shadow: 0px -1px 0px 0px @gray-4 inset;
;

            .is-collapsed & {
                width: 63px;
                justify-content: center;
            }
        }

        &__menu {
            margin-top: 4px;
        }

        &__item {

        }

        &__badge {

        }

        &__name {
            .sidebar & {
                margin-left: 8px;
            }
            font-weight: 400;
        }

        .ant-badge-count {
            font-size: 10px;
            font-weight: 600;
            background: inherit;
            box-shadow: 0 0 0 1px @gray-4;
            min-width: 16px;
            height: 16px;
            line-height: 16px;
            padding: 0 4px;
        }

        .ant-menu {
            padding: 8px 16px;
            
        }

        .ant-menu-dark {
            background-color: @gray-1;
            // border-right: solid 1px @gray-4;
        }


        .ant-menu-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 48px;
            line-height: 22px;
            background-color: @gray-2;
            border: solid 1px @gray-4 !important;
            border-radius: 6px;
            color: @gray-10;

            &:first-child {
                background-color: @primary-1 !important;
                border: 1px solid @primary-7 !important;

                & .ant-badge-count {
                    background: @primary-6;
                    box-shadow: none !important;
                }
            }

            &-selected {
                background-color: @gray-2 !important;
                border: 1px solid #D89614 !important;

                & .ant-badge-count {
                    background: #D89614;
                    box-shadow: none !important;
                }
            }
        }

        .ant-menu-inline-collapsed {
            width: 63px;
            padding: 8px !important;

            .ant-menu-item {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 48px;
                line-height: 22px;
                padding: 0 8px !important;
            }

            .sidebar__name {
                display: none;
            }
        }
    }
</style>