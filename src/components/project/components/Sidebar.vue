<template>
    <div class="sidebar" :class="{'is-collapsed': collapsed}" @click="clickOutside">
        <div class="sidebar__main">
            <div class="sidebar__header" @click="toggleCollapsed" >
                <p v-if="!collapsed">Powiązania</p>
                <a-icon 
                    @click="toggleCollapsed"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'" 
                    :style="{fontSize: '20px'}"
                />
            </div>
            <div class="sidebar__content">
                <a-menu
                    mode="inline"
                    theme="dark"
                    :inline-collapsed="collapsed"
                    class="sidebar__menu"
                    v-if="currentProject.templates.length && currentProject.products.length"
                    v-model="selection.link"
                    >
                    <a-menu-item 
                        :key="0" 
                        @click="selectLink(0)" 
                        class="sidebar__item"
                        :class="{'is-warning':getAllWarnings()}"
                    >
                        <a-badge 
                            class="sidebar__badge"
                            :count="getAllWarnings()?'!': '1'" 
                        />
                        <span 
                            class="sidebar__name" 
                            >
                            Wszystkie szablony x Wszystkie produkty
                        </span>
                    </a-menu-item>

                    <a-menu-item 
                        v-for="(link, index) in currentProject.links"
                        :key="link.id" 
                        @click="selectLink(link.id)" 
                        class="sidebar__item"
                        :class="{'is-warning':getWarning(link)}"
                    >
                        <a-badge 
                            class="sidebar__badge"
                            :count="getWarning(link)?'!':index+2" 
                        />
                        <span 
                            class="sidebar__name" 
                            >
                            {{ currentProject.templates.find(t=> t.id == link.tempId).name }}
                            x
                            {{ currentProject.products.find(p=> p.id == link.prodId).name }}
                        </span>
                    </a-menu-item>

                </a-menu>
                <div class="sidebar__empty" @click="$emit('openLinks')" v-else>
                    <p v-if="!collapsed">Dodaj powiązania, aby rozpocząć! </p>
                </div>
                <div class="sidebar__bottom">
                    <a-button class="sidebar__bottom--btn" type="primary" @click="$emit('openLinks')">
                        <a-icon type="plus"></a-icon> 
                        <span v-if="!collapsed">Dodaj / Edytuj Powiązania</span>
                    </a-button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    name: 'Sidebar',
    props: {
        currentProject: Object,
        selection: Object
    },
    data() {
        return {
            collapsed: false,
        };
    },
    mounted(){
        if(this.currentProject.templates.length && this.currentProject.products.length){
            this.$emit('selectLink',0);
        }
    },  
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
        clickOutside(e){
            if (!e.target.closest('.sidebar__main')){
                this.toggleCollapsed();
            }
        },
        selectLink(id){
            this.$emit('selectLink',id);
            if(!this.collapsed) this.collapsed = true;
        },
        getTempWarnings(temp){
            return !temp.fontColor || !temp.backgroundColor || !temp.oneLine || !temp.moreLines 
        },
        getProdWarnings(prod){
            return !prod.name || !prod.seller || !prod.price 
        },
        getWarning(link){
            const temp = this.currentProject.templates.find(t=>t.id==link.tempId);
            const prod = this.currentProject.products.find(p=>p.id==link.prodId);

            return this.getTempWarnings(temp) || this.getProdWarnings(prod); 
        },
        getAllWarnings(){
            let isWarning = false;
            this.currentProject.templates.forEach(t=> isWarning += this.getTempWarnings(t))
            this.currentProject.products.forEach(p=> isWarning += this.getProdWarnings(p))
            return isWarning
        }
    },
}
</script>

<style lang="less">

    .sidebar {
        position: fixed;
        top: 64px;
        bottom: 0px;
        left: 0px;
        width: 480px;
        z-index: 3;
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
            transition: opacity 0.2s ease-in-out;
            transition-delay: 0.2s;
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

        &__main {
            height: 100%;
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
                background-color: @blue-1 !important;
                border: 1px solid @blue-5 !important;
                & .ant-badge-count {
                    background: @blue-5;
                    box-shadow: none !important;
                }
            }

            &-selected.is-warning {
                background-color: @gray-2 !important;
                border: 1px solid #D89614 !important;

                & .ant-badge-count {
                    background: #D89614;
                    box-shadow: none !important;
                }
            }

            &-selected {
                background-color: @primary-1 !important;
                border: 1px solid @primary-7 !important;

                & .ant-badge-count {
                    background: @primary-6;
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