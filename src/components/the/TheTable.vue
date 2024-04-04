<template lang="pug">
  .table
    .header-row
      div(:style="{width: `20px`}")
        BaseCheckbox
      div(
        v-for="field in fields" :key="field.name"
        :style="{width: `${field.width}px`}"
      ) {{field.title}}

    .selection-controls
      div Выбрано {{selection.length}} из limit
    .row(v-for="item in data" :key="item.id")
      div
        BaseCheckbox(@input="toggleRow(item.id)" :model-value="selection.includes(item.id)")
      div.column(
        v-for="field in fields" :key="field.name"
        :style="{width: `${field.width}px`}"
        )
          div(v-if="field.name === 'images'")
            img.small(:src="item[field.name][0]")
          div(v-else-if="field.name === 'remote_id'")
            img(:src="LinkIcon" height="24" width="24")
            | {{item[field.name]}}
          div(v-else-if="['min_price', 'max_price'].includes(field.name)")
            BaseInput(v-model="item[field.name]" :size="'sm'")
          div(v-else) {{item[field.name]}} {{`${field.name === 'price' ? '₽' : ''}`}}
</template>

<script>
import BaseInput from '../Base/BaseInput.vue';
import BaseCheckbox from '../Base/BaseCheckbox.vue';
import LinkIcon from '../../assets/icons/link-icon.svg'

export default {
  name: "TheTable",
  components: {
    BaseInput,
    BaseCheckbox,
  },

  props: {
    data: Array,
    limit: Number,
  },
  data() {
    return {
      LinkIcon,
      selection: [],
      fields: [
        {
          name: 'images',
          title: 'Фото',
          width: 50,
        },
        {
          title: 'Артикул продавца',
          name: 'remote_id',
          width: 130,
        },
        {
          title: 'Бренд',
          name: 'brand_name',
          width: 125,
        },
        {
          title: 'Название',
          name: 'title',
          width: 350,
        },
        {
          title: 'Остаток, шт.',
          name: 'quantity',
          width: 120,
        },
        {
          title: 'Текущая цена',
          name: 'price',
          width: 135,
        },
        {
          title: 'Минимальная цена',
          name: 'min_price',
          width: 135,
        },
        {
          title: 'Максимальная цена',
          name: 'max_price',
          width: 135,
        },
      ]
    }
  },
  methods: {
    toggleRow(id) {
      const index = this.selection.indexOf(id)
      index === -1 ? this.selection.push(id) : this.selection.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="sass">
.row
  display: flex
  gap: 20px
  border-bottom: 1px solid $mainGray
  padding: 5px
  height: 60px
  box-sizing: border-box
  align-items: center

  div
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

.header-row
  display: flex
  font-size: 14px
  color: $mainGray
  gap: 20px
  border-bottom: 1px solid $mainGray
  padding: 5px
  box-sizing: border-box
  height: 60px
  align-items: center

.small
  width: 50px
  height: 50px
  object-fit: cover
  vertical-align: middle

.column
  box-sizing: border-box
  padding: 0
  margin: 0

  div
    box-sizing: border-box
    padding: 0
    margin: 0
</style>