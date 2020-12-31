
<template>
    <div>   
        <div class="projects__header">
            <h2>Projekty</h2>
            <a-button type="primary"><a-icon type="plus" :style="{ width: '16px'}"/> Nowy projekt</a-button>
        </div>
        <a-row :gutter="[16,16]">
            <a-col v-for="project in projects" :key="project.id" :span="6">
                <s-project-card 
                    :project="project"
                    @editProject="$emit('editProject',project)">
                </s-project-card>
            </a-col>
            <a-col :span="6">
                <s-empty-card></s-empty-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectCard from "./ProjectCard";
import EmptyCard from "./EmptyCard";

export default {
    name: 'Projects',
    components: {
        SProjectCard: ProjectCard,
        SEmptyCard: EmptyCard
    },
    data(){
        return {

        }
    },
    computed:{
		...mapState({
			waiting: state => state.waiting,
			projects: state => state.ProjectsModule.projects,
		})
	},
	mounted(){
		this.getProjects()
			.then(() => {
				console.log('Projekty załadowane');
			})
	},
	methods: {
        ...mapActions(["getProjects"]),
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