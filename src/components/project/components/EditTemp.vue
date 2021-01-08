<template>
    <div class="edition__template">
        <p class="edition__header"> {{ temp.name }} </p>

        <div class="edition__font">

            <div class="edition__font-size">
                <p class="form__label">Font Family</p>
                <s-input 
                    class="edition__input"
                    :placeholder="'Inter'"
                    :prefix="'font-size'"
                    :warning="!temp.fontSize"
                    :obj="temp"
                    :name="'fontSize'"
                />
            </div>

            <div class="edition__font-color">
                <p class="form__label">Font Color</p>
                <s-input 
                    class="edition__input" 
                    :placeholder="'#FF5A00'"
                    :prefix="'font-colors'"
                    :prefixColor="'#FF5A00'"
                    :warning="!temp.fontColor"
                    :obj="temp"
                    :name="'fontColor'"
                />
            </div>
        
 

        </div>

        <p class="form__label">Background Color</p>
        <s-input 
            class="edition__input" 
            :placeholder="'#FF5A00'"
            :prefix="'bg-colors'"
            :prefixColor="'#FF5A00'"
            :warning="!temp.backgroundColor"
            :obj="temp"
            :name="'backgroundColor'"
        />

        <p class="form__label">Tekst - Jedna linia</p>
        <s-input 
            class="edition__input" 
            :placeholder="'Wzmocnij odporność przed jesienią!'"
            :warning="!temp.oneLine"
            :obj="temp"
            :name="'oneLine'"
        />

        <p class="form__label">Tekst - Wiele linii</p>
        <a-textarea 
            rows="2" 
            class="edition__input" 
            placeholder="Wzmocnij odporność przed jesienią!"
            :class="{'has-warning':!temp.moreLine}"
        />

        <p class="form__label">Obrazek 1</p>
        <s-temp-upload />

        <p class="form__label">Select</p>
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
import Input from "../../layout/Input";

export default {
    name: 'EditTemp',
    props: {
        temp: Object
    },
    components: {
        STempUpload: TempUpload,
        SInput: Input
    },

}
</script>