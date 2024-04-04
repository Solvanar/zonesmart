<template lang="pug">
.container
  router-view
</template>

<script lang="ts">
export default {
  name: "MainLayout"
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
  margin: 30px
</style>