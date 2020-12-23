<template>
  <div id="app">

    

      <a-layout>

        <s-header></s-header> 

        <a-layout-content>
          <s-projects></s-projects>
        </a-layout-content>


    </a-layout>


    
  </div>
</template>

<script>

import Header from "./components/layout/Header"
import Projects from './components/projects/Projects.vue'

export default {
  name: 'App',
  components: {
    SHeader: Header,
    SProjects: Projects
  }
}
</script>

<style>



</style>
