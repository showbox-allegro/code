
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
                v-for="template in 4" 
                class="links__item" 
                :key="template"
            >
                Nazwa powiązania
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        <a-icon type="more" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <span><a-icon type="edit" /> Zmień nazwę</span>
                        </a-menu-item>
                        <a-menu-item>
                            <span class="danger"><a-icon type="sync" /> Resetuj</span>
                        </a-menu-item>
                        <a-menu-item>
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
 
}
</script>

<style lang="less">
    .items {
        width: 50%;

    }
</style>