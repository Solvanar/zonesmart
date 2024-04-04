<template lang="pug">
  TheHeader
  .container
    router-view
</template>

<script lang="ts">
import TheHeader from '../the/TheHeader.vue'
export default {
  name: "MainLayout",
  components: {
    TheHeader,
  }
}
</script>

<style lang="sass" scoped>
.container
  min-width: 430px
  width: fit-content
  height: fit-content
  padding: 20px 40px
  background-color: $white
  border-radius: 15px
  box-shadow: 0 6px 8px 0 #00000029
  margin: 90px
</style>