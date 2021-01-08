<template>

    <transition name="fadeIn" mode="in-out" appear>
        <div class="login">
            <div class="login__box">
                <img class="login__logo" src="../../assets/logo-white.svg">

                <p class="login__title">Załóż konto </p>

                <p class="login__label">Email</p>
                <a-input class="login__input" placeholder="Email" />

                <p class="login__label">Hasło</p>
                <a-input-password class="login__input" placeholder="Hasło" />

                <a-button @click="$emit('createAccount')" type="primary">Utwórz konto</a-button>

                <a-checkbox class="login__check">Zgadzam się</a-checkbox>
            </div>

            <div class="login__bottom">
                <p class="login__info">Masz konto?</p>
                <a class="login__link" @click="$emit('login')">Zaloguj się</a>
            </div>

        </div>
    </transition>

</template>

<script>
export default {
    name: 'Logout',
    data(){
        return {
            visible: true
        }
    },
}
</script>
