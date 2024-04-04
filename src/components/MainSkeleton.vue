<template lang="pug">
  h1.shimmering &nbsp;

  .skeleton-text
    .shimmering(:style="{flex: 1}")
    .shimmering(:style="{flex: 2}")
    .shimmering(:style="{flex: 1}")

  .skeleton-text
    .shimmering(:style="{flex: 2}")
    .shimmering(:style="{flex: 1}")

  .skeleton-table.shimmering
    .row(v-for="i in skeletonRows" :key="i")
      .cell(v-for="j in skeletonColumns" :key="j")
</template>

<script lang="ts">
export default {
  name: "MainSkeleton",
  data() {
    return {
      skeletonRows: 4,
      skeletonColumns: 8,
    }
  },
}
</script>

<style scoped lang="sass">
.shimmering
  background: linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%)
  background-size: 300%
  background-position-x: 100%
  animation: shimmer 1s infinite linear

@keyframes shimmer
  to
    background-position-x: 0%

.skeleton-table
  min-width: 1200px
  height: 180px
  border-radius: 6px
  padding: 10px
  display: flex
  flex-direction: column
  gap: 5px

  .row
    display: block
    box-sizing: border-box
    background-color: #fdfdfd
    width: 100%
    height: 100%

.skeleton-text
  margin-bottom: 30px
  display: flex
  width: 100%
  gap: 20px
  border-radius: 5px

  div
    height: 15px
</style>
