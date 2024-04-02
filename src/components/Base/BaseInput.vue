<template lang="pug">
  .base-input
    label {{label}}
    input(
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    )
</template>

<script lang="ts">
export default {
  name: "BaseInput",
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
}
</script>

<style lang="sass" scoped>
.base-input
  display: flex
  flex-direction: column

  label
    font-size: 12px
    color: $mainGray
    margin-bottom: 8px

  input
    height: 50px
    background-color: $mainBackground
    border-radius: 6px
    box-shadow: 0 1px 2px 0 #00000040 inset
    border: none
    padding: 12px 20px
    box-sizing: border-box

    &::placeholder
       color: $mainGray
</style>