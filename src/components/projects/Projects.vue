
<template>
    <div>   
        <div class="projects__header">
            <h2>Projekty</h2>
            <a-button type="primary">Button></a-button>
        </div>
        <a-row :gutter="[16,16]">
            <a-col v-for="card in 10" :key="card" :span="6">
                <s-project-card></s-project-card>
            </a-col>
            <a-col :span="6">
                <s-empty-card></s-empty-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import ProjectCard from "./ProjectCard";
import EmptyCard from "./EmptyCard";

export default {
    name: 'Projects',
    components: {
        SProjectCard: ProjectCard,
        SEmptyCard: EmptyCard
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