<template>

    <transition name="fadeIn" mode="in-out" appear>
        <div class="login">
            <div class="login__box">
                <img class="login__logo" src="../../assets/logo-white.svg">

                <p class="login__title">Zaloguj się </p>

                <p class="login__label">Email</p>
                <a-input class="login__input" placeholder="Email" />

                <p class="login__label">Hasło</p>
                <a-input-password class="login__input" placeholder="Hasło" />

                <a-button @click="$emit('login')" type="primary">Zaloguj się </a-button>

                <a class="login__link" href="">Nie pamiętasz hasła</a>
            </div>

            <div class="login__bottom">
                <p class="login__info">Nie masz konta?</p>
                <a class="login__link" @click="$emit('signup')">Zarejestruj się</a>
            </div>

        </div>
    </transition>

</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            visible: true
        }
    },
}
</script>

<style lang="less">
    .login {

        &__box {
            display: flex;
            flex-direction: column;
            background-color: @gray-2;
            border: solid 1px @gray-4;
            border-radius: 6px;
            padding: 56px 24px;
        }

        &__bottom {
            margin-top: 8px;
            text-align: center;
        }

        &__title {
            font-size: 16px;
            font-weight: 600;
            margin-top: 32px;
            margin-bottom: 16px;
        }

        &__logo {
            display: flex;
            width: 240px;
            margin: auto;
        }

        &__input {
            width: 290px;
            margin-bottom: 16px;
        }

        &__link {
            text-align: center;
            margin-top: 16px;
            text-decoration: underline;

            &:hover {
                text-decoration: underline;
            }
        }

        &__info {
            color: @gray-9;
            margin-bottom: 8px;
        }

        &__label {
            margin-bottom: 4px;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            color: @gray-9;
        }

        &__check {
            margin-top: 16px;
            color: @gray-9;
        }
    }
</style>