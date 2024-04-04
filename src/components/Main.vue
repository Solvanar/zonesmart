<template lang="pug">
  MainSkeleton(v-if="isLoading")
  template(v-if="!isLoading")
    h1 Мои товары
      img(:src="QuestionIcon" height="24" width="24")
      span.faint {{limit}} из {{totalCount}}
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
      BaseButton(:disabled="true") Добавить

    TheTable(
      v-if="!isLoading"
      :data="data"
      :fields="fields"
      :totalCount="totalCount"
      :limit="limit"
      :offset="offset"
      @updatePrice="updatePrice"
      @setOffset="setOffset"
      @setLimit="setLimit"
    )
    .table-loader(:class="{'visible' : isLoadingTable}")
    ThePagination(:limit="limit" :offset="offset" :pages="pages" @set-offset="setOffset" @set-limit="setLimit")
</template>

<script lang="ts">
import BaseInput from './Base/BaseInput.vue'
import BaseButton from './Base/BaseButton.vue'
import TheTable from './the/TheTable.vue';
import ThePagination from './the/ThePagination.vue'
import MainSkeleton from './skeletons/MainSkeleton.vue';
import QuestionIcon from '../assets/icons/question-icon.svg'

import { mapActions } from 'vuex';

export default {
  name: "Main",
  components: {
    TheTable,
    ThePagination,
    BaseInput,
    BaseButton,
    MainSkeleton,
  },
  data() {
    return {
      data: [],
      totalCount: 0,
      isLoading: false,
      isLoadingTable: false,
      limit: 4,
      offset: 0,
      fields: [
        {
          name: 'checkbox',
          title: '',
          width: 25,
        },
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
        {
          title: 'Удалить',
          name: '',
          width: 55,
        },
      ],
      QuestionIcon,
    }
  },
  mounted() {
    this.loadData(false);
  },
  computed: {
    pages() {
      return Math.ceil(this.totalCount / this.limit)
    },
  },
  methods: {
    ...mapActions(['getData']),
    setLoading(onlyTable, flag) {
      if (onlyTable) {
        this.isLoadingTable = flag
        return
      }
      this.isLoading = flag
    },
    loadData(onlyTable) {
      this.setLoading(onlyTable, true)
      this.getData({ limit: this.limit, offset: this.offset })
          .then((res) => {
            this.data = res.results
            this.totalCount = +res.count
          })
          .catch((error) => console.log(error))
          .finally(() => this.setLoading(onlyTable, false))
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
      this.loadData(true)
    },
    setLimit(limit) {
      if (limit > 10) {
        return
      }
      this.limit = +limit
      this.loadData(true)
    },
  },
}
</script>

<style scoped lang="sass">
h1
  display: inline-flex
  align-items: center
  gap: 10px

  .faint
    color: $mainGray
    font-size: 16px

.add-form
  display: flex
  align-items: center
  gap: 20px
  margin-bottom: 30px

.dashed
  cursor: pointer
  text-decoration: underline dashed

.table-loader
  position: relative
  width: 100%
  height: 10px

  &.visible
    background-image: repeating-linear-gradient(-45deg,transparent,transparent 1rem, $subGray 1rem, $subGray 2rem)
    background-size: 200% 200%
    animation: stripes 10s linear infinite

@keyframes stripes
  100%
    background-position: 100% 100%
</style>
