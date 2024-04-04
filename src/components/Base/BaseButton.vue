<template lang="pug">
    button(:disabled="disabled") {{text}}
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String,
    disabled: Boolean,
  },
}
</script>

<style lang="sass" scoped>
button
  background-color: $mainGreen
  border-radius: 6px
  padding: 18px 30px
  border: none
  color: $white
  font-weight: 600
  width: fit-content
  height: 50px

  &:hover
     background: $mainGreenDark

  &:active:not(&:disabled)
     background: $mainGreenDoubleDark

  &:disabled
     background-color: $mainBackground
     color: $mainGray
</style>