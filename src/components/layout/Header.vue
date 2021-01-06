<template>
    <a-layout-header class="header">

        <div class="header__left">
            <img class="header__logo" @click = "$emit('goToProjects')" src="../../assets/logo-white.svg">

            <div class="header__project" v-if="view == 'project' ">
                <a-input
                    v-model="currentProject.name" 
                    class="header__search" 
                    enter-button 
                    placeholder="Mój nowy projekt"
                />
                <a-dropdown>
                    <a-button class="ant-dropdown-link header__project-btn" type="default" @click="e => e.preventDefault()">
                        <a-icon type="more" />
                    </a-button>
                    <a-menu slot="overlay">
                        <a-menu-item @click="$emit('saveProject')">
                            <span><a-icon type="save" /> Zapisz</span>
                        </a-menu-item>
                        <a-menu-item @click="$emit('copyProject')">
                            <span><a-icon type="copy" /> Duplikuj</span>
                        </a-menu-item>
                        <a-menu-item @click="$emit('infoProject')">
                            <span ><a-icon type="code" /> Informacje</span>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item @click="$emit('deleteProject')">
                            <span class="danger"><a-icon type="delete" /> Usuń</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>

                <p class="header__project-save"> Zapisano 5 minut temu</p>
            </div>
        </div>

        <a-input-search 
            v-if="view == 'projects' "
            v-model="sorters.query" 
            class="header__search" 
            enter-button 
            placeholder="Szukaj"
        />

        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-avatar :size="32" icon="user" />
            </a>
            <a-menu slot="overlay">
                <a-menu-item>
                    <span><a-icon type="user" /> Konto</span>
                </a-menu-item>
                <a-menu-item>
                    <span><a-icon type="file-add" /> Dodaj szablon</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                    <span><a-icon type="logout" /> Wyloguj</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
        

    </a-layout-header>
</template>

<script>
export default {
    props: {
        sorters: Object,
        view: String,
        currentProject: Object
    },
    data(){
        return {
            name: ""
        }
    }
    
}
</script>

<style lang="less">

    .header {
        position: fixed;
        z-index: 3;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 24px;
        background-color: @gray-2;
        border-bottom: solid 1px #303030;

        &__left {
            display: flex;
            align-items: center;
        }

        &__logo {
            cursor: pointer;
            height: 32px;
        }

        &__search {
            width: 320px;
            background-color: @gray-1;
        }

        &__project {
            display: flex;
            align-items: center;
            margin-left: 32px;

            &-btn {
                margin-left: 8px;
                padding-left: 8px;
                padding-right: 8px;
            }

            &-save {
                margin-left: 32px;
                font-weight: 400;
                color: @gray-8;
            }
        }

    }
</style>