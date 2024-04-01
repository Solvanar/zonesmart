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
  width: 430px
  height: fit-content
  padding: 20px 40px
  background-color: $white
  border-radius: 15px
  box-shadow: 0 6px 8px 0 #00000029
</style>