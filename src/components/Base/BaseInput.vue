<template lang="pug">
  .base-input
    label {{label}}
    input(
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="`size-${size || 'auto'}`"
      @input="onInput"
    )
    .label-footer
      slot(name="footer")
</template>

<script lang="ts">
export default {
  name: "BaseInput",
  props: {
    modelValue: String | Number,
    label: String,
    placeholder: String,
    disabled: Boolean,
    size: String,
    type: {
      type: String,
      default: 'string'
    },
  },
  emits: ['update:modelValue'],
  methods: {
    moneyMask(e) {
      let value = e.target.value.replace(/\D/g, '')

      const result = new Intl.NumberFormat('ru').format(value)
      e.target.value = result + ' ₽'
    },
    onInput(e) {
      this.type === 'money' && this.moneyMask(e)
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style lang="sass" scoped>
.base-input
  display: flex
  flex-direction: column

  label
    font-size: 12px
    color: $mainGray
    margin-bottom: 2px

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

  .label-footer
    font-size: 12px
    color: $mainGray
    margin-top: 2px

  .size-lg
    width: 500px

  .size-auto
    width: auto

  .size-sm
    height: 30px
    width: auto
    padding: 7px 10px
</style>