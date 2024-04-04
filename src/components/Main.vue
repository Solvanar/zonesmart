<template lang="pug">
  h1 Мои товары ?
  p Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
  p Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter

  .add-form
    BaseInput(
      :placeholder="'Введите артикул продавца, артикул WB или ссылку на товар'"
      :label="'Добавление товаров'"
      :disabled="true"
      :size="'lg'"
    )
      template(v-slot:footer) Например ваши товары: #[span.dashed 119203059], #[span.dashed 124366343], #[span.dashed 59801844]
    BaseButton(:disabled="true" :text="'Добавить'")

  TheTable(:data="data")
</template>

<script lang="ts">
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'
import TheTable from './the/TheTable.vue';
import { mapActions } from 'vuex';

export default {
  name: "Main",
  components: {
    TheTable,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      data: [],
      count: 0,
      isLoading: false,
    }
  },
  mounted() {
    this.setLoading(true)
    this.getData({ limit: 4, offset: 0 })
        .then((res) => {
          this.data = res.results
          this.count = res.count
        })
        .catch((error) => console.log(error))
        .finally(() => this.setLoading(false))
  },
  methods: {
    ...mapActions(['getData']),
    setLoading(flag) {
      this.isLoading = flag
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
