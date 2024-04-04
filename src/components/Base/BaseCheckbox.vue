<template lang="pug">
  input(
    type="checkbox"
    class="base-checkbox"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    )
</template>

<script lang="ts">
export default {
  name: "BaseCheckbox",
  emits: ['update:modelValue'],
  props: {
    modelValue: Boolean,
  },
}
</script>

<style scoped lang="sass">
.base-checkbox
  appearance: none
  -webkit-appearance: none
  display: flex
  align-content: center
  justify-content: center
  padding: 0.1rem
  border: 1px solid $mainGray
  border-radius: 6px
  width: 19px
  height: 19px

.base-checkbox::before
  content: ""
  width: 15px
  height: 15px
  clip-path: polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%)
  transform: scale(0)
  background-color: $white

.base-checkbox:checked
  background-color: $mainGreen
  border-color: $mainGreen

.base-checkbox:checked::before
  transform: scale(1)

.base-checkbox:hover
  color: black


</style>