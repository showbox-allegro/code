<template>
	<div>  

		<a-layout>

			<s-header 
				:view="view"
				:currentProject="currentProject"
				:sorters="sorters"
				:tempSorters="tempSorters"
				@goToProjects="view='projects'"
				@saveProject="saveProject(currentProject)"
				@copyProject="copyProject(currentProject)"
				@infoProject="infoProject(currentProject)"
				@deleteProject="deleteProject(currentProject)"
				@showTemplates="view='templates'"
				@showUserModal="userModal=true"
				@logout="$emit('logout')"
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
					@renameProject="renameProject($event)"
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
					:sorters="tempSorters"
				/>
				<s-user-modal
					v-if="userModal"
					@closeUserModal = "userModal = false"
				/>
				<s-rename-modal
					v-if="renameModal"
					:currentProject="currentProject"
					@renameProject="saveProject(currentProject)"
					@closeRenameModal="renameModal = false"
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
import { Modal } from 'ant-design-vue';
import { mapMutations, mapActions, mapState } from "vuex";
import Header from "./components/Header";
import Project from '../project/Project.vue';
import Projects from '../projects/Projects.vue';
import Mask from "../layout/Mask";
import InfoModal from "./components/InfoModal";
import UserModal from "./components/UserModal";
import RenameModal from "./components/RenameModal";
import Templates from '../templates/Templates.vue';

export default {
	name: 'Main',
	components: {
		SHeader: Header,
		SProjects: Projects,
		SProject: Project,
		sMask: Mask,
		SInfoModal: InfoModal,
		SUserModal: UserModal,
		SRenameModal: RenameModal,
		STemplates: Templates,
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
			tempSorters: {
				query: "",
				sort: "name" 
			},
			infoModal: false,
			infoData: {},
			userModal: false,
			renameModal: false,
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
		renameProject(project){
			this.currentProject = project;
			this.renameModal=true;
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
			this.renameModal = false;
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
