
<template>
    <div class="edition scroll box">   
        <h3 class="box__title">Edycja - statyczny</h3>
        <div v-if="!selected" class="box__empty">
            <p>Dodaj powiązania, aby rozpocząć! </p>
        </div>
        <div v-else class="box__main">

            <p class="edition__header"> {{ temp.name }} </p>

            <div class="edition__font">

                <div class="edition__font-size">
                    <p class="input__label">Font Family</p>
                    <a-input class="edition__input" placeholder="Inter">
                        <a-icon slot="prefix" type="font-size" />
                    </a-input>
                </div>

                <div class="edition__font-color">
                    <p class="input__label">Font Color</p>
                    <a-input class="edition__input" placeholder="#FF5A00">
                        <a-icon slot="prefix" type="font-colors" style="color:#FF5A00"/>
                    </a-input>
                </div>

            </div>

            <p class="input__label">Background Color</p>
            <a-input class="edition__input" placeholder="#FF5A00">
                <a-icon slot="prefix" type="bg-colors" style="color:#FF5A00"/>
            </a-input>


            <p class="input__label">Tekst - Jedna linia</p>
            <a-input class="edition__input" placeholder="Wzmocnij odporność przed jesienią!"/>

            <p class="input__label">Tekst - Wiele linii</p>
            <a-textarea :rows="2" class="edition__input" placeholder="Wzmocnij odporność przed jesienią!"/>

            <p class="input__label">Obrazek 1</p>
            <s-temp-upload />

            <p class="input__label">Select</p>
            <a-select class="edition__select">
                <a-select-option v-for="i in 10" :key="i" >
                    Opcja {{ i }}
                </a-select-option>
            </a-select>

            <a-divider />

            <p class="edition__header"> {{ prod.name }} </p>

            <div class="edition__font">

                <div class="edition__font-size">
                    <p class="input__label">Font Family</p>
                    <a-input class="edition__input" placeholder="Inter">
                        <a-icon slot="prefix" type="font-size" />
                    </a-input>
                </div>

                <div class="edition__font-color">
                    <p class="input__label">Font Color</p>
                    <a-input class="edition__input" placeholder="#FF5A00">
                        <a-icon slot="prefix" type="font-colors" style="color:#FF5A00"/>
                    </a-input>
                </div>

            </div>

            <p class="input__label">Background Color</p>
            <a-input class="edition__input" placeholder="#FF5A00">
                <a-icon slot="prefix" type="bg-colors" style="color:#FF5A00"/>
            </a-input>


            <p class="input__label">Tekst - Jedna linia</p>
            <a-input class="edition__input" placeholder="Wzmocnij odporność przed jesienią!"/>

            <p class="input__label">Tekst - Wiele linii</p>
            <a-textarea :rows="2" class="edition__input" placeholder="Wzmocnij odporność przed jesienią!"/>

            <p class="input__label">Obrazek 1</p>
            <s-temp-upload />

            <p class="input__label">Select</p>
            <a-select class="edition__select">
                <a-select-option v-for="i in 10" :key="i" >
                    Opcja {{ i }}
                </a-select-option>
            </a-select>
        </div>
    </div>
</template>

<script>
import TempUpload from "./TempUpload";

export default {
    name: 'Edition',
    components: {
        STempUpload: TempUpload
    },
    props: {
        selected: Boolean,
        temp: Object,
        prod: Object
    },
    data(){
        return {

        }
    },
 
}
</script>

<style lang="less">
    .edition {
        width: calc(50% - 8px);
        margin-right: 16px;
        height: calc(100vh - 64px - 16px - 24px);

        &__header {
            font-weight: 600;
            margin-bottom: 16px;
        }

        &__input {
            margin-bottom: 16px;
        }

        &__font {
            display: flex;
            justify-content: space-between;

            &-size {
                flex-grow: 1;
                margin-right: 16px;
            }
            &-color {
                width: 200px;
            }
        }

        &__image {

        }

        &__select {
            width: 100%;
        }


    }
</style>