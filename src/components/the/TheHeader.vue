<template>
  <component :is="currentRouteName === 'main' ? Default : Login" class="header" />
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
  name: "TheHeader",
  computed: {
    Default() {
      return defineAsyncComponent(() =>
          import('./headers/Default.vue')
      )
    },
    Login() {
      return defineAsyncComponent(() =>
          import('./headers/Login.vue')
      )
    },
    currentRouteName() {
      return this.$router.currentRoute.value.name
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="sass">
.header
  top: 0
  width: 100%
  height: 60px
  position: fixed
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 30px
  box-sizing: border-box
  z-index: 1

  &.main
    background-color: $white
    border-bottom: 1px solid $subGray

  &.login
    background-color: transparent

</style>