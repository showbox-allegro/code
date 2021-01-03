<template>
    <li>
        <a-checkbox @change="$emit('toggleSelect')">
            <a-badge class="items__badge" :count="index + 1" />
            {{ tempName }} x {{ prodName }}
        </a-checkbox>
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="more" />
            </a>
            <a-menu slot="overlay">
                <a-menu-item @click="$emit('editLink')">
                    <span><a-icon type="edit" /> Edytuj</span>
                </a-menu-item>
                <a-menu-item @click="$emit('resetSettings')">
                    <span class="danger"><a-icon type="sync" /> Resetuj</span>
                </a-menu-item>
                <a-menu-item @click="$emit('deleteLink')">
                    <span><a-icon type="delete" /> Usuń</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </li>

</template>


<script>

export default {
    name: 'Item',
    props: {
        link: Object,
        index: Number,
        tempName: String,
        prodName: String
    },
}
</script>