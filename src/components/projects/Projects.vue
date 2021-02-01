
<template>
    <div>   
        <div class="listHeader">
            <div class="listHeader__left">
                <h2>Projekty </h2>
                <span class="listHeader__number">({{projects.length}})</span>
                <a-dropdown>
                    <a class="ant-dropdown__link" @click="e => e.preventDefault()">
                        <p class="listHeader__sort">Sortuj wg <a-icon type="down" /></p>
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
                    @copyProject="$emit('copyProject',project)"
                    @infoProject="$emit('infoProject',project)"
                    @deleteProject="$emit('deleteProject',project)"
                    @renameProject="$emit('renameProject',project)"
                />
            </a-col>
            <a-col v-if="!sorters.query" :span="6">
                <s-empty-card
                    @click.native="$emit('createProject')"
                />
            </a-col>
        </a-row>

    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import ProjectCard from "./components/ProjectCard";
import EmptyCard from "./components/EmptyCard";
import Empty from "../layout/Empty";


export default {
    name: 'Projects',
    components: {
        SProjectCard: ProjectCard,
        SEmptyCard: EmptyCard,
        SEmpty: Empty
    },
    props: {
        sorters: Object
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
		if (!this.projects.length) {
            this.getProjects()
			.then(() => {
				console.log('Projekty załadowane');
            })
        }
	},
	methods: {
        ...mapActions(["getProjects"]),
	}

}
</script>
