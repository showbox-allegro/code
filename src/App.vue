<template>
	<div id="app">  

		<a-layout>

			<s-header 
				:view="view"
				:currentProject="currentProject"
				:sorters="sorters"
				@goToProjects="view='projects'"
				@saveProject="saveProject(currentProject)"
				@copyProject="copyProject(currentProject)"
				@infoProject="infoProject(currentProject)"
				@deleteProject="deleteProject(currentProject)"
				@showTemplates="view='templates'"
			/> 

			<a-layout-content>
				<s-projects 
					v-if="view=='projects'"
					:sorters="sorters"
					@editProject="editProject($event)"
					@createProject="createProject"
					@copyProject="copyProject($event)"
					@infoProject="infoProject($event)"
					@deleteProject="deleteProject($event)"
				/>
				<s-project 
					v-if="view=='project'"
					:currentProject = "currentProject"
					@saveProject="saveProject(currentProject)"
				/>
				<s-info-modal
					v-if="infoModal"
					:info-data= "infoData"
					@saveInfoData = "saveInfoData"
					@closeInfoModal = "infoModal = false"
				/>
				<s-templates 
					v-if="view=='templates'"
					:sorters="sorters"
				/>
			</a-layout-content>	

					<!-- @editTemp="editTemp($event)"
					@createTemp="createTemp"
					@copyTemp="copyTemp($event)"
					@infoTemp="infoTemp($event)"
					@deleteTemp="deleteTemp($event)" -->

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
import { Modal } from 'ant-design-vue';
import { mapMutations, mapActions, mapState } from "vuex";
import Header from "./components/layout/Header";
import Project from './components/project/Project.vue';
import Projects from './components/projects/Projects.vue';
import Mask from "./components/layout/Mask";
import InfoModal from "./components/layout/InfoModal";
import Templates from './components/templates/Templates.vue';

export default {
	name: 'App',
	components: {
		SHeader: Header,
		SProjects: Projects,
		SProject: Project,
		sMask: Mask,
		SInfoModal: InfoModal,
		STemplates: Templates
	},
	data(){
		return {
			currentProject: {},
			emptyProject: {
				id: null,
				name: "",
				created: "",
				updated: "",
				templates: [],
				products: [],
				links: []
			},
			view: "projects",
			sorters: {
				query: "",
				sort: "name" //created, updated
			},
			infoModal: false,
			infoData: {}
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
		...mapMutations(["showAlert","closeAlert"]),
		...mapActions(["updateProject","addProject","removeProject","duplicateProject"]),
		editProject(project){
			this.currentProject = project;
			this.view = "project";
		},
		createProject(){
			this.currentProject = this.emptyProject;
			this.view = "project";
		},
		copyProject(project){
			this.duplicateProject(project);
			this.view = "projects";
		},
		deleteProject(project){    
            Modal.confirm({
                title: 'Usunąć projekt?',
                content: 'Usuwając projekt utracisz wszystkie grafiki i powiązania.',
                cancelText: 'Anuluj',
                okText: 'Usuń',
                icon: 'exclamation-circle',
                onOk: () => {
					this.removeProject(project);
					this.view = "projects";
                }
            });
		},
		infoProject(project){
			this.infoModal = true;
			this.infoData = project;
		},
        saveInfoData(){
            this.showAlert({ text: "Informacje zostały zapisane", type: "success"})
            this.infoModal = false;
		},
		saveProject(project){
            //TODO:
            if(project.id){
                this.updateProject(project);
            } else {
                this.addProject(project);
            }
		}

	}
}
</script>

<style lang="less">


</style>
