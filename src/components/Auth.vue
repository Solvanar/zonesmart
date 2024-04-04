<template lang="pug">
  h1 Вход
  .no-account Нет аккаунта?&nbsp
    a Зарегистрироваться
  BaseInput(:placeholder="'yourmail@mail.ru'" :label="'Email'" v-model="email" :disabled="isLoading")
  BaseInput(:placeholder="'Ваш пароль'" :label="'Пароль'" v-model="password" :disabled="isLoading")
  .forget-password
    a Забыли пароль?
  BaseButton(:disabled="!email || !password || isLoading" @click="submit") {{isLoading ? 'Авторизация...' : 'Войти'}}
</template>

<script lang="ts">
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'

import { mapActions } from 'vuex'

export default {
  name: "Auth",
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    }
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    setLoadingState(flag: boolean) {
      this.isLoading = flag;
    },
    submit() {
      this.setLoadingState(true)
      this.login({email: this.email, password: this.password})
          .then(() => this.$router.push({ name: 'main' }))
          .catch(() => console.log('Error login'))
          .finally(() => this.setLoadingState(false))
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
