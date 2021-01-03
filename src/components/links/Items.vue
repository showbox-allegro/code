
<template>
    <div class="items">   
        <div class="title">
            <h3>Powiązania</h3>
            <a-button type="default">
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        Eksportuj <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <a href="javascript:;">Zaznaczone</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">Wszystko</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj"/>
        </div>
        <ul class="links__items">
            <li 
                v-for="(link, index) in links" 
                class="links__item" 
                :key="link.id"
            >
                <a-checkbox>
                    <a-badge class="items__badge" :count="index + 1" />
                    {{ link.name }}
                </a-checkbox>
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        <a-icon type="more" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <span><a-icon type="edit" /> Edytuj</span>
                        </a-menu-item>
                        <a-menu-item @click="$emit('resetSetting')">
                            <span class="danger"><a-icon type="sync" /> Resetuj</span>
                        </a-menu-item>
                        <a-menu-item @click="$emit('deleteLink',link.id)">
                            <span><a-icon type="delete" /> Usuń</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </li>   
        </ul>
    </div>
</template>

<script>

export default {
    name: 'Items',
    data(){
        return {

        }
    },
    props: {
        links: Array
    }
 
}
</script>

<style lang="less">
    .items {
        width: 50%;

        &__badge {
            margin-left: 4px;
            margin-right: 4px;
            margin-bottom: 2px;
        }

    }
</style>