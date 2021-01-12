<template>
    <div class="edition__product">
        <p class="edition__header"> {{ prod.name }} </p>

        <p class="form__label">Nazwa produktu</p>
        <s-input 
            class="edition__input"
            :placeholder="'Nazwa produktu'"
            :warning="!prod.name"
            :obj="prod"
            :name="'name'"
        />
  
        <p class="form__label">Nazwa oferent</p>
        <s-input 
            class="edition__input"
            :placeholder="'Seller'"
            :warning="!prod.seller"
            :obj="prod"
            :name="'seller'"
        />

        <p class="form__label">Cena</p>
        <s-input 
            class="edition__input"
            :placeholder="'Cena'"
            :warning="!prod.price"
            :obj="prod"
            :name="'price'"
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
    name: 'EditProd',
    props: {
        prod: Object
    },
    components: {
        STempUpload: TempUpload,
        SInput: Input
    }
}
</script>