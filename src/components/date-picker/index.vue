<template>
  <div class="wrapper">
    <div class="date-picker">
      <v-menu
        ref="menu"
        v-model="menu"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            readonly
            v-model="date"
            label="选择月份"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          type="month"
          no-title
          scrollable
          locale="cn"
          @change="select"
        >
        </v-date-picker>
      </v-menu>
    </div>
    <transition name="fade">
      <div class="display" v-if="date">
        <div class="count">
          <v-chip
            class="ma-2"
            :color="bill.monthlyIncome > 0 ? 'green' : 'red'"
            text-color="white"
          >
            <v-icon left>mdi-blinds</v-icon>
            <span class="bold">{{
              `${date.split('-')[0]}年${Number(date.split('-')[1])}月`
            }}</span
            >的
            <span class="bold">{{ formatCategory(queryConfig.category) }}</span>
            收支总金额：{{ bill.monthlyIncome.toLocaleString('en-US') }}
            元
          </v-chip>
        </div>
        <div class="refresh">
          <v-btn icon color="green" @click="refresh">
            <v-icon>mdi-cached</v-icon>
          </v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data: () => ({
    date: '',
    menu: false,
    modal: false,
  }),
  computed: {
    ...mapState(['bill', 'queryConfig', 'categories']),
  },
  methods: {
    ...mapMutations(['setMonthRange']),
    formatCategory(id) {
      return this.categories.map.get(id)
    },
    select(date) {
      this.$refs.menu.save(date)
      const [year, month] = date.split('-')
      const selectedFirstDay = +new Date(year, month - 1)
      const selectedLastDay = +new Date(year, month, 0)
      this.setMonthRange([selectedFirstDay, selectedLastDay])
      this.$emit('selectMonth')
    },
    refresh() {
      this.date = ''
      this.setMonthRange([0, 0])
      this.$emit('refresh')
    },
  },
}
</script>

<style lang="stylus" scoped>
.wrapper
  flex 1
  margin 0 20px
  display flex
  align-items center
  .date-picker
    width 100px
  .display
    display flex
    align-items center
    .bold
     font-weight 700
</style>
