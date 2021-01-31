<template>
    <li 
        @click="selectTemplate"
    >
        <p v-if="!editMode">{{ template.name }}</p>
        <a-input 
            v-else 
            v-model="template.name"
            @blur="editMode = false"
            placeholder="Nazwa szablonu" 
        />
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="more"/>
            </a>
            <a-menu slot="overlay">
                <a-menu-item @click="editMode = true">
                    <span><a-icon type="edit" /> Zmień nazwę</span>
                </a-menu-item>
                <a-menu-item @click="$emit('deleteTemplate')">
                    <span><a-icon type="delete" /> Usuń</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </li>

</template>


<script>

export default {
    name: 'Template',
    props: {
        template: Object
    },
    data(){
        return {
            editMode: false,
        }
    },
    methods: {
        selectTemplate(){
            if(!this.editMode){
                this.$emit('selectTemplate')
            }
        }
    }
}
</script>