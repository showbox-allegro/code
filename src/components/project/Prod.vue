<template>
    <div class="edition__product">
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

        <a-divider />
    </div>
</template>

<script>
import TempUpload from "./TempUpload";

export default {
    name: 'Prod',
    props: {
        prod: Object
    },
    components: {
        STempUpload: TempUpload
    }
}
</script>