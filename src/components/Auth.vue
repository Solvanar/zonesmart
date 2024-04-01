<template lang="pug">
  h1 Вход
  .no-account Нет аккаунта?&nbsp
    a Зарегистрироваться
  BaseInput(:placeholder="'yourmail@mail.ru'" :label="'Email'" v-model="login")
  BaseInput(:placeholder="'Ваш пароль'" :label="'Пароль'" v-model="password")
  .forget-password
    a Забыли пароль?
  BaseButton(:text="'Войти'" :disabled="!login || !password" @click="login")
</template>

<script lang="ts">
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'

export default {
  name: "Auth",
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    submit() {

    },
  },
}
</script>

<style lang="sass" scoped>
h1
  font-weight: 800

div
  margin-bottom: 20px
</style>
