
<template>
    <div class="templates">   
        <div class="title">
            <h3>Szablony</h3>
            <a-button type="dashed">
                <a-icon type="plus"/>
                Dodaj
            </a-button>
        </div>
        <div class="links__search">
            <a-input-search enter-button placeholder="Szukaj"/>
        </div>
        <ul class="links__items">
            <li 
                v-for="template in templates" 
                :class="{'is-selected': template.id == selection}"
                class="links__item" 
                :key="template.id"
                @click="$emit('selectTemplate', template.id)"
            >
                Nazwa szablonu
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        <a-icon type="more" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item>
                            <span><a-icon type="edit" /> Zmień nazwę</span>
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
    name: 'Templates',
    props: {
        selection: Number
    },
    data(){
        return {
            templates: [
                {
                    id: 1,
                    name: "Nazwa szablonu"
                },
                {
                    id: 2,
                    name: "Nazwa szablonu"
                },
                {
                    id: 3,
                    name: "Nazwa szablonu"
                },
                {
                    id: 4,
                    name: "Nazwa szablonu"
                }
            ]
        }
    },

}
</script>

<style lang="less">
    .templates {
        width: 25%;
        border-right: solid 1px @gray-4;


    }
</style>