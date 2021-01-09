
<template>
    <div class="graphics scroll box">   
        <div class="box__title">
            <h4>Grafiki</h4>
            <a-button type="default">
                <a-dropdown>
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        Eksportuj <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item @click="$emit('exportSelectedGraphics', selectedBanners)" :disabled="!selectedBanners.length">
                            <p>Zaznaczone</p>
                        </a-menu-item>
                        <a-menu-item @click="$emit('exportAllCreations')">
                            <p>Wszystkie kreacje</p>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item @click="$emit('exportAllLinks')">
                            <p>Wszystkie Powiązania</p>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-button>
        </div>
        <div class="graphics__search">
            <a-select mode="tags" placeholder="Szukaj po rozmiarze" @change="searchSize">
                <a-select-option v-for="size in allSizes" :key="size">
                    {{ size }}
                </a-select-option>
            </a-select>
        </div>
        <div v-if="!selected" class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
        <ul v-else class="box__main">
            <li v-for="banner in filteredBanners" :key="banner.id" class="banner">
                <div class="banner__header">
                    <a-checkbox @change="toggleSelect(banner.id)" class="banner__checkbox">{{ banner.size }}</a-checkbox>
                    <a-button @click="$emit('editBanner',banner)" class="banner__btn" type="default">
                        <a-icon type="edit" />
                    </a-button>
                </div>
                <div class="banner__image">
                    <img src="@/assets/graphics/banner.png"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'Graphics',
    props: {
        selected: Boolean,
    },
    data(){
        return {
            selectedSizes: [],
            selectedBanners: [],
            banners: [
                {
                    id: 1,
                    size: "405x136",
                    img: "banner.png"
                },
                {
                    id: 2,
                    size: "543x361",
                    img: "banner.png"
                },
                {
                    id: 3,
                    size: "438x61",
                    img: "banner.png"
                }
            ]
        }
    },
    computed: {
        allSizes(){
            return this.banners.map(b=>b.size)
        },
        filteredBanners(){
            return this.selectedSizes.length
                ?
                this.banners.filter(b=> this.selectedSizes.indexOf(b.size)!==-1)
                : 
                this.banners;
        }
    },
    methods: {
        toggleSelect(id){
            const index = this.selectedBanners.findIndex(l => l === id);
            if (index !== -1) {
                this.selectedBanners.splice(index, 1);
            } else {
                this.selectedBanners.push(id);
            }
        },
        searchSize(value){
            this.selectedSizes = value;
        }
    }
 
}
</script>

<style lang="less">
    .graphics {
        width: calc(50% - 8px);
        height: calc(100vh - 64px - 16px - 24px);

        &__search {
            padding: 12px 16px;
            border-bottom: solid 1px @gray-4;

            .ant-select{
                width: 100%;
            }
        }
    }
</style>