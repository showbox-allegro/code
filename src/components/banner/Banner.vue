
<template>
    <div class="sbanner">   
        <div class="title">
            <p>Edycja grafiki</p>
            <a-icon 
                type="close" 
                :style="{ fontSize: '20px', cursor: 'pointer', padding: '8px'}"
                @click="$emit('closeBanner')"
            />
        </div>
        <div class="sbanner__main scroll">
            <div class="sbanner__side">
                <label class="form__label">Font Family</label>
                <s-input 
                    class="edition__input"
                    :placeholder="'Inter'"
                    :prefix="'font-size'"
                    :warning="!banner.fontSize"
                    :obj="banner"
                    :name="'fontSize'"
                />

                <label class="form__label">Font Color</label>
                <s-input 
                    class="edition__input" 
                    :placeholder="'#FF5A00'"
                    :prefix="'font-colors'"
                    :prefixColor="'#FF5A00'"
                    :warning="!banner.fontColor"
                    :obj="banner"
                    :name="'fontColor'"
                />

                <label class="form__label">Background Color</label>
                <s-input 
                    class="edition__input" 
                    :placeholder="'#FF5A00'"
                    :prefix="'bg-colors'"
                    :prefixColor="'#FF5A00'"
                    :warning="!banner.backgroundColor"
                    :obj="banner"
                    :name="'backgroundColor'"
                />

                <label class="form__label">Tekst - Jedna linia</label>
                <s-input 
                    class="edition__input" 
                    :placeholder="'Wzmocnij odporność przed jesienią!'"
                    :warning="!banner.oneLine"
                    :obj="banner"
                    :name="'oneLine'"
                />

                <p class="form__label">Obrazek 1</p>
                <s-img-upload />
            </div>

            <div class="sbanner__preview">
                <div class="sbanner__size">
                    <a-button @click="changeSize(-10)" type="default">
                        <a-icon type="minus"/>
                    </a-button>
                    <p class="sbanner__size-text">{{bWidth}}%</p>
                    <a-button @click="changeSize(10)" type="default">
                        <a-icon type="plus"/>
                    </a-button>
                </div>
                <img :width="`${bWidth}%`" src="@/assets/graphics/banner.png"/>
            </div>
           
        </div>
        <div class="sbanner__bottom">
            <a-button type="default" class="sbanner__download">
                <a-icon type="download" />
                Eksportuj grafikę
            </a-button>
            <a-button type="primary" @click="saveAndClose">Zapisz zmiany i zamknij</a-button>
        </div>
    </div>
</template>

<script>
import Input from "../layout/Input";
import ImgUpload from "./ImgUpload";

export default {
    name: 'Baner',
    props: {
        banner: Object
    },
    data(){
        return {
            bWidth: 50
        }
    },
    components: {
        SInput: Input,
        SImgUpload: ImgUpload
    },
    methods:{
        saveAndClose(){
            this.$emit("closeBanner")
        },
        changeSize(diff) {
            const newSize = this.bWidth + diff;

            if (newSize>0 && newSize <=100){
                this.bWidth = newSize;
            }
        }
    }
}

</script>

<style lang="less">
    .sbanner {
        position: absolute;
        top: 64px;
        bottom: 0px;
        left: 0px;
        width: 100%;
        // height: 100%;
        background-color: @gray-1;
        z-index: 3;

        &__main {
            display: flex;
            height: calc(100% - 64px - 48px);
        }

        &__bottom {
            padding: 0px 24px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 48px;
            background-color: @gray-2;
            border-top: solid 1px @gray-4;
        }

        &__download {
            margin-right: 8px;
        }

        &__side {
            padding: 16px;
            background-color: @gray-2;
            width: 360px;
        }
        &__preview {
            position: relative;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &__size {
            position: absolute;
            top: 16px;
            right: 16px;
            display: flex;
            align-items: center;

            &-text{
                margin-left: 8px;
                margin-right: 8px;
            }
        }
    
    }
</style>