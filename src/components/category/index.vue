<template>
  <div class="category">
    <div class="select">
      <v-select
        dense
        return-object
        v-model="queryConfig.category"
        :items="categories.list"
        item-text="name"
        item-value="id"
        clearable
        label="选择账单分类"
        outlined
        @change="selectCategory"
      ></v-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['categories', 'queryConfig']),
  },
  methods: {
    ...mapMutations(['setQueryCategory']),
    selectCategory(item) {
      if (item) {
        const { id } = item
        this.setQueryCategory(id)
        this.$emit('selectCategory')
      } else {
        this.setQueryCategory('')
        this.$emit('clearCategory')
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.category
  margin 0 20px 0 10px
  width 200px
</style>
