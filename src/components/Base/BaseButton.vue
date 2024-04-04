<template lang="pug">
    button(
      :disabled="disabled"
      :class="classNames"
    )
      slot
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    text: String,
    disabled: Boolean,
    size: {
      type: String,
      default: 'auto'
    },
    colorScheme: {
      type: String,
      default: 'default'
    },
  },
  computed: {
    classNames() {
      return [
          `color-scheme-${this.colorScheme}`,
          `size-${this.size}`,
          {'disabled': this.disabled},
      ]
    }
  }
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
  position: relative
  display: flex
  align-items: center
  gap: 8px

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    background-color: rgba(0, 0, 0)
    border-radius: 6px
    opacity: 0
    width: 100%
    height: 100%
    mix-blend-mode: color-burn

  &:hover:not(&:disabled)::before
    opacity: 0.05

  &:active:not(&:disabled)::before
    opacity: 0.1

  &.size-auto
    width: auto
    height: 50px

  &.size-sm
    width: auto
    height: 30px
    padding: 8px 10px

  &.color-scheme-default
    background-color: $mainGreen

  &.color-scheme-white
    background-color: $buttonGray
    color: $black

  &.disabled
    background-color: $mainBackground
    color: $mainGray
</style>