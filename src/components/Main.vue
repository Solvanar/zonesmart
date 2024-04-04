<template lang="pug">
  MainSkeleton(v-if="isLoading")

  template(v-if="!isLoading")
    h1(v-if="!isLoading") Мои товары ? {{limit}} из {{totalCount}}
    p Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
    p Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter

    .add-form(v-if="!isLoading")
      BaseInput(
        :placeholder="'Введите артикул продавца, артикул WB или ссылку на товар'"
        :label="'Добавление товаров'"
        :disabled="true"
        :size="'lg'"
      )
        template(v-slot:footer) Например ваши товары: #[span.dashed 119203059], #[span.dashed 124366343], #[span.dashed 59801844]
      BaseButton(:disabled="true") Добавить

    TheTable(
      v-if="!isLoading"
      :data="data"
      :totalCount="totalCount"
      :limit="limit"
      :offset="offset"
      @updatePrice="updatePrice"
      @setOffset="setOffset"
      @setLimit="setLimit"
    )
</template>

<script lang="ts">
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'
import TheTable from './the/TheTable.vue';
import MainSkeleton from './MainSkeleton.vue';
import { mapActions } from 'vuex';

export default {
  name: "Main",
  components: {
    TheTable,
    BaseInput,
    BaseButton,
    MainSkeleton,
  },
  data() {
    return {
      data: [],
      totalCount: 0,
      isLoading: false,
      limit: 4,
      offset: 0,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions(['getData']),
    setLoading(flag) {
      this.isLoading = flag
    },
    loadData() {
      this.setLoading(true)
      this.getData({ limit: this.limit, offset: this.offset })
          .then((res) => {
            this.data = res.results
            this.totalCount = +res.count
          })
          .catch((error) => console.log(error))
          .finally(() => this.setLoading(false))
    },
    updatePrice({selection, field, price}) {
      this.data.forEach(item => {
        if (!selection.includes(item.id)) {
          return
        }

        item[field] = price
      })
    },
    setOffset(offset) {
      this.offset = +offset
      this.loadData()
    },
    setLimit(limit) {
      this.limit = +limit
      this.loadData()
    },
  },
}
</script>

<style scoped lang="sass">
.add-form
  display: flex
  align-items: center
  gap: 20px
  margin-bottom: 30px

.dashed
  cursor: pointer
  text-decoration: underline dashed

.table
  margin-bottom: 30px
</style>
