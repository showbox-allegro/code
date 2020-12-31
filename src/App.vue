<template>
	<div id="app">  

		<a-layout>

			<s-header></s-header> 

			<a-layout-content>
			<s-projects 
				v-if="view=='projects'"
				@editProject="view = 'project'"
			></s-projects>
			<s-project v-if="view=='project'"></s-project>
			</a-layout-content>	


		</a-layout>

	
		<div class="alerts">
			<a-alert 
				v-if="alertVisible"
				:message="alert.text" 
				:type="alert.type ? alert.type : 'info'" 
				show-icon 
				banner
			/>
		</div>

		<s-mask v-if="waiting">
			<a-spin size="large"/>
		</s-mask>


  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Header from "./components/layout/Header";
import Project from './components/project/Project.vue';
import Projects from './components/projects/Projects.vue';
import Mask from "./components/layout/Mask";

export default {
	name: 'App',
	components: {
		SHeader: Header,
		SProjects: Projects,
		SProject: Project,
		sMask: Mask
	},
	data(){
		return {
			view: "projects"
		}
	},
	computed:{
		...mapState({
			waiting: state=> state.waiting,
			alert: state => state.alert,
			alertVisible: state => state.alertVisible,
		})
	},
	methods: {
		...mapMutations(["closeAlert"])
	}
}
</script>

<style lang="less">


</style>
