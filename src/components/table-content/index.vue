<template>
  <div class="table">
    <div class="content">
      <v-data-table
        :headers="headers"
        :items="bill.list"
        :items-per-page="queryConfig.pageSize"
        :loading="loading"
        hide-default-footer
        no-data-text="暂无数据"
      >
        <template v-slot:top>
          <div class="table-header">
            <category
              class="categories"
              @selectCategory="selectCategory"
              @clearCategory="refresh"
            />
            <date-picker @selectMonth="selectMonth" @refresh="refresh" />
            <add-bill class="add" @refresh="refresh"/>
          </div>
        </template>
        <template v-slot:item.time="{ item }">
          <div>{{ item.time | formatDate }}</div>
        </template>
        <template v-slot:item.type="{ item }">
          <v-chip :color="item.type ? '#4CAF50' : '#F44336'" dark>{{
            item.type | formatType
          }}</v-chip>
        </template>
        <template v-slot:item.category="{ item }">
          <v-chip color="#1E88E5" :label="true" outlined>{{
            formatCategory(item.category)
          }}</v-chip>
        </template>
      </v-data-table>
    </div>
    <div class="control">
      <div class="select">
        <v-select
          dense
          v-model="queryConfig.pageSize"
          :items="pageItems"
          solo
          @change="resizeFetch"
        ></v-select>
      </div>
      <v-chip class="ma-2" :label="true"> 总数：{{ bill.total }} </v-chip>
      <div class="pagination">
        <v-pagination
          v-model="queryConfig.pageNum"
          :length="paginationLength"
          @input="current"
          @next="next"
          @previous="previous"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '../date-picker'
import Category from '../category'
import AddBill from '../addBill'
import { formatDate, formatType } from '@/plugins/filter'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  filters: {
    formatDate,
    formatType,
  },
  components: {
    DatePicker,
    Category,
    AddBill,
  },
  data: () => ({
    headers: [
      {
        text: '账单时间',
        align: 'start',
        value: 'time',
      },
      { text: '账单类型', value: 'type', sortable: false },
      { text: '账单分类', value: 'category', sortable: false },
      { text: '账单金额(￥)', value: 'amount', align: 'center' },
    ],
    pageItems: [5, 10, 15, 20],
  }),
  computed: {
    ...mapState(['bill', 'loading', 'queryConfig', 'categories']),
    paginationLength() {
      return Math.ceil(this.bill.total / this.queryConfig.pageSize)
    },
  },
  methods: {
    ...mapMutations(['setPageNum']),
    ...mapActions(['getBill', 'getCategories']),
    formatCategory(id) {
      return this.categories.map.get(id)
    },
    fetchData() {
      this.getBill({ dirty: false })
    },
    initData() {
      this.setPageNum(1)
      this.getBill({ dirty: true })
    },
    resizeFetch() {
      this.setPageNum(1)
      this.fetchData()
    },
    current() {
      this.fetchData()
    },
    next() {
      this.fetchData()
    },
    previous() {
      this.fetchData()
    },
    selectMonth() {
      this.initData()
    },
    refresh() {
      this.initData()
    },
    selectCategory() {
      this.initData()
    },
  },
  created() {
    this.initData()
    this.getCategories()
  },
}
</script>

<style lang="stylus" scpoed>
.table
  .table-header
    display flex
    align-items baseline
  .content
    margin 20px
    padding 10px
    border 1px solid #eee
  .control
    display flex
    justify-content center
    .select
      width 85px
</style>
