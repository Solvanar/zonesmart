<template lang="pug">
  .table
    .row.header-row
      div(
        v-for="field in fields" :key="field.name"
        :style="{width: `${field.width}px`}"
      )
        template(v-if="field.name === 'checkbox'")
          BaseCheckbox
        template(v-else) {{field.title}}

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
        BaseInput(:size="'sm'" v-model="massMinPrice" @change="massMinPriceSet" :type="'money'")

      div(:style="{width: `${priceWidth}px`}")
        BaseInput(:size="'sm'" v-model="massMaxPrice" @change="massMaxPriceSet" :type="'money'")

      div(:style="{width: `${fields[fields.length - 1].width}px`}")

    .row.content-row(v-for="item in data" :key="item.id")
      div.column(
          v-for="field in fields" :key="field.name"
          :style="{width: `${field.width}px`}"
        )
          div(v-if="field.name === 'checkbox'")
            BaseCheckbox(@input="toggleRow(item.id)" :model-value="selection.includes(item.id)")

          div(v-if="field.name === 'images'")
            img.small(:src="item[field.name][0]")

          div(v-else-if="field.name === 'remote_id'")
            img(:src="LinkIcon" height="24" width="24")
            | {{item[field.name]}}

          div(v-else-if="['min_price', 'max_price'].includes(field.name)")
            BaseInput(v-model="item[field.name]" :size="'sm'" :type="'money'")

          div(v-else-if="field.name === ''")
            img(:src="DeleteIcon" height="24" width="24")

          div(v-else) {{item[field.name]}} {{`${field.name === 'price' ? '₽' : ''}`}}
</template>

<script>
import BaseInput from '../Base/BaseInput.vue'
import BaseCheckbox from '../Base/BaseCheckbox.vue'
import BaseButton from '../Base/BaseButton.vue'
import LinkIcon from '../../assets/icons/link-icon.svg'
import DeleteIcon from '../../assets/icons/delete-icon.svg'

export default {
  name: "TheTable",
  components: {
    BaseButton,
    BaseInput,
    BaseCheckbox,
  },
  props: {
    data: Array,
    fields: Array,
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
    }
  },
  computed: {
    priceWidth() {
      return this.fields.find(item => item.name === 'price')?.width || 135
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
      this.$emit('update-price', {selection: this.selection, field: 'min_price', price: e.target.value})
    },
    massMaxPriceSet(e) {
      this.$emit('update-price', {selection: this.selection, field: 'max_price', price: e.target.value})
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