<template lang="pug">
  .table
    .row.header-row
      div(:style="{width: `20px`}")
        BaseCheckbox
      div(
        v-for="field in fields" :key="field.name"
        :style="{width: `${field.width}px`}"
      ) {{field.title}}
      div Удалить

    .row.selection-row(v-if="selection.length")
      div Выбрано {{selection.length}} из {{data.length}}
      div
        BaseButton(
          :size="'sm'"
          :color-scheme="'white'"
          @click="removeSelected"
        )
          img(:src="DeleteIcon" height="24" width="24")
          | Удалить выделенные
      div.push Для всех выделенных
      div(:style="{width: `${priceWidth}px`}")
        BaseInput(:size="'sm'" v-model="massMinPrice" @change="massMinPriceSet")
      div(:style="{width: `${priceWidth}px`}")
        BaseInput(:size="'sm'" v-model="massMaxPrice" @change="massMaxPriceSet")

    .row.content-row(v-for="item in data" :key="item.id")
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
      div
        img(:src="DeleteIcon" height="24" width="24")

  ThePagination(:limit="limit" :offset="offset" :pages="pages" @set-offset="setOffset" @set-limit="setLimit")

</template>

<script>
import BaseInput from '../Base/BaseInput.vue'
import BaseCheckbox from '../Base/BaseCheckbox.vue'
import BaseButton from '../Base/BaseButton.vue'
import LinkIcon from '../../assets/icons/link-icon.svg'
import DeleteIcon from '../../assets/icons/delete-icon.svg'
import ThePagination from '../the/ThePagination.vue'

export default {
  name: "TheTable",
  components: {
    BaseButton,
    BaseInput,
    BaseCheckbox,
    ThePagination,
  },
  props: {
    data: Array,
    limit: Number,
    offset: Number,
    totalCount: Number,
  },
  emits: ['update-price', 'set-offset', 'set-limit'],
  data() {
    return {
      LinkIcon,
      DeleteIcon,
      selection: [],
      massMinPrice: 0,
      massMaxPrice: 0,
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
  computed: {
    priceWidth() {
      return this.fields.find(item => item.name === 'price')?.width || 135
    },
    pages() {
      return Math.ceil(this.totalCount / this.limit)
    },
  },
  methods: {
    toggleRow(id) {
      const index = this.selection.indexOf(id)
      index === -1 ? this.selection.push(id) : this.selection.splice(index, 1)
    },
    removeSelected() {
      console.log('Удалены элементы: ', JSON.stringify(this.selection))
    },
    massMinPriceSet(e) {
      this.$emit('update-price', {selection: this.selection, field: 'min_price', price: +e.target.value})
    },
    massMaxPriceSet(e) {
      this.$emit('update-price', {selection: this.selection, field: 'max_price', price: +e.target.value})
    },
    setOffset(page) {
      this.$emit('set-offset', page)
    },
    setLimit(limit) {
      this.$emit('set-limit', limit)
    },
  }
}
</script>

<style scoped lang="sass">
.row
  display: flex
  gap: 20px
  padding: 5px
  height: 60px
  box-sizing: border-box
  align-items: center

.content-row
  border-bottom: 1px solid $mainGray

  div
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap

.header-row
  font-size: 14px
  color: $mainGray
  border-bottom: 1px solid $mainGray

.selection-row
  background-color: $subGray
  padding-left: 20px

  .push
    margin-left: auto

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