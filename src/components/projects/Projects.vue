
<template>
    <div>   
        <div class="projects__header">
            <h2>Projekty</h2>
            <a-button 
                @click.native="$emit('createProject')" 
                type="primary"
            >
                <a-icon type="plus" :style="{ width: '16px'}"/> Nowy projekt
            </a-button>
        </div>
        <s-empty v-if="projects.length && !filteredProjects.length"></s-empty>
        <a-row :gutter="[16,16]">
            <a-col v-for="project in filteredProjects" :key="project.id" :span="6">
                <s-project-card 
                    :project="project"
                    @click.native="$emit('editProject',project)"
                    @editProject="$emit('editProject',project)"
                    @copyProject="copyProject(project)"
                    @infoProject="infoProject(project)"
                    @deleteProject="deleteProject(project)"
                />
            </a-col>
            <a-col v-if="!query" :span="6">
                <s-empty-card
                    @click.native="$emit('createProject')"
                />
            </a-col>
        </a-row>
        <s-info-modal
            v-if="infoModal"
            :info-data= "infoData"
            @saveInfoData = "saveInfoData"
            @closeInfoModal = "infoModal = false"
        />
    </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
import { mapState, mapActions, mapMutations } from "vuex";
import ProjectCard from "./ProjectCard";
import EmptyCard from "./EmptyCard";
import InfoModal from "./InfoModal";
import Empty from "../layout/Empty";


export default {
    name: 'Projects',
    components: {
        SProjectCard: ProjectCard,
        SEmptyCard: EmptyCard,
        SInfoModal: InfoModal,
        SEmpty: Empty
    },
    props: {
        query: String
    },
    data(){
        return {
            deleteModal: false,
            infoModal: false,
            infoData: {}
        }
    },
    computed:{
		...mapState({
			waiting: state => state.waiting,
			projects: state => state.ProjectsModule.projects,
        }),
        filteredProjects(){
            return this.query 
                ? 
                this.projects.filter(p=>p.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 )
                : 
                this.projects;
        }
	},
	mounted(){
		this.getProjects()
			.then(() => {
				console.log('Projekty załadowane');
			})
	},
	methods: {
        ...mapMutations(["showAlert"]),
        ...mapActions(["getProjects", "removeProject", "duplicateProject"]),
        copyProject(project){
            this.duplicateProject(project)
        },
        infoProject(project){
            this.infoModal = true;
            this.infoData = project;
        },
        deleteProject(project){    
            Modal.confirm({
                title: 'Usunąć projekt?',
                content: 'Usuwając projekt utracisz wszystkie grafiki i powiązania.',
                cancelText: 'Anuluj',
                okText: 'Usuń',
                icon: 'exclamation-circle',
                onOk: () => {
                    this.removeProject(project)
                }
            });
        },
        saveInfoData(){
            this.showAlert({ text: "Informacje zostały zapisane", type: "success"})
            this.infoModal = false;
        }

	}

}
</script>

<style lang="less">
    .projects {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 24px 0;
        }
    }
</style>