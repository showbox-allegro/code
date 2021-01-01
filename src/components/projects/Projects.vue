
<template>
    <div>   
        <div class="projects__header">
            <div class="projects__header-left">
                <h2>Projekty </h2>
                <span class="projects__header-number">({{projects.length}})</span>
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        <p class="projects__header-sort">Sortuj wg <a-icon type="down" /></p>
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item @click="sorters.sort='name'">
                            <p>Nazwa</p>
                        </a-menu-item>
                        <a-menu-item @click="sorters.sort='created'">
                            <p>Data utworzenia</p>
                        </a-menu-item>
                        <a-menu-item @click="sorters.sort='updated'">
                            <p>Data edycji</p>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
            <a-button 
                @click.native="$emit('createProject')" 
                type="primary"
            >
                <a-icon type="plus" :style="{ width: '16px'}"/> Nowy projekt
            </a-button>
        </div>
        <s-empty v-if="projects.length && !filteredProjects.length" :size="'xl'"/>
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
            <a-col v-if="!sorters.query" :span="6">
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
        sorters: Object
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
            let filtered = this.projects; 

            if(this.sorters.query){
                filtered = this.projects.filter(p=>p.name.toLowerCase().indexOf(this.sorters.query.toLowerCase()) !== -1 );
            }

            if(this.sorters.sort=='name'){
                filtered.sort((a, b) => a.name.localeCompare(b.name))
            }

            if(this.sorters.sort=='created'){
                filtered.sort((a, b) => new Date(b.created).getTime()-new Date(a.created).getTime())
            }

            if(this.sorters.sort=='updated'){
                filtered.sort((a, b) => new Date(b.updated).getTime()-new Date(a.updated).getTime())
            }

            return filtered
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

            &-left {
                display: flex;
                align-items: flex-end;
            }

            &-number {
                margin-bottom: 4px;
                margin-left: 8px;
                font-size: 16px;
                font-weight: 600;
            }

            &-sort {
                margin-bottom: 4px;
                margin-left: 26px;
                font-weight: 400;
                color: @gray-9;
            }
        }
    }
</style>