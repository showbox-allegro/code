<template>
    <div class="card">
        <div class="card__top">
            <img class="card__img" src="@/assets/graphics/banner.png" />
        </div>
        <div class="card__bottom">
            <p class="card__title"> {{ temp.name }} </p>
            <p class="card__info">Opis szablonu: {{ temp.desc }}</p>
            <a-dropdown class="card__options">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-icon type="more" />
                </a>
                <a-menu slot="overlay">
                    <a-menu-item @click="$emit('editProject')">
                        <span><a-icon type="edit" /> Edytuj</span>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'TempCard',
    props: {
        temp: Object
    }
}
</script>

<style lang="less">

</style>