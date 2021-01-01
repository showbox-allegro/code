<template>
	<div id="app">  

		<a-layout>

			<s-header 
				:view="view"
				:currentProject="currentProject"
				:sorters="sorters"
				@goToProjects = "view='projects'"
			/> 

			<a-layout-content>
			<s-projects 
				v-if="view=='projects'"
				:sorters="sorters"
				@editProject="editProject($event)"
				@createProject="createProject"
			></s-projects>
			<s-project 
				v-if="view=='project'"
				:currentProject = "currentProject"
			/>
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
			currentProject: {},
			emptyProject: {
				id: null,
				name: "",
				created: "",
				updated: ""
			},
			view: "projects",
			sorters: {
				query: "",
				sort: "name" //created, updated
			}
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
		...mapMutations(["closeAlert"]),
		editProject(project){
			this.currentProject = project;
			this.view = "project";
		},
		createProject(){
			this.currentProject = this.emptyProject;
			this.view = "project";
		}
	}
}
</script>

<style lang="less">


</style>
