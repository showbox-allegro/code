<template>
    <a-input 
        :class="{'has-warning': warning}"
        :placeholder="placeholder"
        v-model="dataObject[name]"
        >
            <a-icon v-if="prefix" slot="prefix" :type="prefix" :style="{'color': prefixColor}" />
            <a-icon v-if="warning" slot="suffix" style="color: #D89614" type="exclamation-circle" theme="filled" />
    </a-input>
</template>

<script>
export default {
    name: 'Input',
    props: {
        obj: Object,
        name: String,
        placeholder: String,
        prefix: String,
        prefixColor: String,
        warning: Boolean,
    },
    computed: {
        dataObject(){
            return this.obj || {}
        }
    }

}
</script>

<style lang="less">

  
</style>