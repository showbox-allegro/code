
<template>
    <div>   
        <div class="listHeader">
            <div class="listHeader__left">
                <h2>Szablony </h2>
                <span class="listHeader__number">({{temps.length}})</span>
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
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
                @click.native="newTempModal=true" 
                type="primary"
            >
                <a-icon type="plus" :style="{ width: '16px'}"/> Nowy szablon
            </a-button>
        </div>
        <s-empty v-if="temps.length && !filteredTemps.length" :size="'xl'"/>
        <a-row :gutter="[16,16]">
            <a-col v-for="temp in filteredTemps" :key="temp.id" :span="6">
                <s-temp-card 
                    :temp="temp"
                    @click.native="$emit('editTemp',temp)"
                    @editTemp="$emit('editTemp',temp)"
                    @copyTemp="$emit('copyTemp',temp)"
                    @infoTemp="$emit('infoTemp',temp)"
                    @deleteTemp="$emit('deleteTemp',temp)"
                />
            </a-col>
            <a-col v-if="!sorters.query" :span="6">
                <s-empty-card
                    @click.native="newTempModal=true"
                />
            </a-col>
        </a-row>

        <s-new-temp 
            v-if="newTempModal"
            @closeNewTempModal="newTempModal=false"
            @createTemp="createTemp($event)"
        />

    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import TempCard from "./components/TempCard";
import EmptyCard from "./components/EmptyCard";
import Empty from "../layout/Empty";
import NewTemp from "./components/NewTemp";

export default {
    name: 'Templates',
    components: {
        STempCard: TempCard,
        SEmptyCard: EmptyCard,
        SEmpty: Empty,
        SNewTemp: NewTemp
    },
    props: {
        sorters: Object
    },
    data(){
        return {
            newTempModal: false
        }
    },
    computed:{
		...mapState({
			waiting: state => state.waiting,
			temps: state => state.TemplatesModule.temps,
        }),
        filteredTemps(){
            let filtered = this.temps; 

            if(this.sorters.query){
                filtered = this.temps.filter(p=>p.name.toLowerCase().indexOf(this.sorters.query.toLowerCase()) !== -1 );
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
		if (!this.temps.length) {
            this.getTemps()
			.then(() => {
				console.log('Szablony załadowane');
            })
        }
	},
	methods: {
        ...mapActions(["getTemps","addTemp"]),
        createTemp(temp){
            this.addTemp(temp);
            this.newTempModal = false;
        }
	}

}
</script>

<style lang="less">

</style>