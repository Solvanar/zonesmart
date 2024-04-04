<template lang="pug">
  .pagination
    .page(:class="{'hidden': offset <= 0}" @click="decreaseOffset") <
    .page(
      v-for="i in pages"
      :key="i"
      :class="{'selected': i === currentPage}"
      @click="setOffset((i - 1) * limit)"
    ) {{i}}
    .page(:class="{'hidden': offset >= (pages - 1) * limit}" @click="increaseOffset") >

    .limit Элементов на странице:
      BaseInput(:model-value="limit" :size="'sm'" @change="(e) => $emit('set-limit', e.target.value)")
</template>

<script lang="ts">
import BaseInput from '../Base/BaseInput.vue'

export default {
  name: "ThePagination",
  components: {
    BaseInput
  },
  props: {
    offset: Number,
    limit: Number,
    pages: Number,
  },
  computed: {
    currentPage() {
      return Math.floor(this.offset / this.limit) + 1
    }
  },
  emits: ['set-limit', 'set-offset'],
  methods: {
    increaseOffset() {
      const maxOffset = (this.pages - 1) * this.limit

      if (this.offset < maxOffset) {
        this.setOffset(this.offset + this.limit)
      }
    },
    decreaseOffset() {
      if (this.offset >= this.limit) {
        this.setOffset(this.offset - this.limit)
      }
    },
    setOffset(page) {
      this.$emit('set-offset', page)
    }
  }
}
</script>

<style scoped lang="sass">
.pagination
  display: flex
  gap: 10px
  align-items: center
  margin-top: 20px

  .page
    width: 40px
    height: 40px
    display: flex
    align-items: center
    justify-content: center

    &.hidden
      visibility: hidden

    &:hover, &.selected
      background-color: $subGray
      border-radius: 6px

  .limit
    margin-left: auto
    display: flex
    gap: 10px
    align-items: center
</style>