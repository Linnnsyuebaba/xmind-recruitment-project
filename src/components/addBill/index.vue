<template>
  <div class="add-bill">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          添加账单
        </v-btn>
      </template>
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">添加账单</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        readonly
                        v-model="form.date"
                        label="账单日期*"
                        :rules="rules.date"
                        required
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date"
                      locale="cn"
                      @input="dateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.type"
                    :items="type"
                    item-text="value"
                    item-value="key"
                    label="账单收支*"
                    :rules="rules.type"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.amount"
                    label="账单金额(￥)*"
                    :rules="rules.amount"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.category"
                    :items="categories.list"
                    item-text="name"
                    item-value="id"
                    label="账单类型*"
                    :rules="rules.category"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="dialog = false">关闭</v-btn>
            <v-btn color="primary" @click="validate">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="addStatus.success ? '#4CAF50' : '#F44336'"
    >
      {{ addStatus.msg }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    dateMenu: false,
    snackbar: false,
    addStatus: {
      success: false,
      msg: '',
    },
    form: {
      date: '',
      type: '',
      amount: '',
      category: '',
    },
    rules: {
      date: [(v) => !!v || '日期必填'],
      type: [(v) => v === 0 || v === 1 || '收支类型必填'],
      amount: [(v) => !!v || '金额必填', (v) => !isNaN(v) || '请输入数字'],
      category: [(v) => !!v || '账单类型必填'],
    },
    type: [
      {
        key: 0,
        value: '支出',
      },
      {
        key: 1,
        value: '收入',
      },
    ],
  }),
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapActions(['addBill']),
    async validate() {
      if (this.$refs.form.validate()) {
        const {
          data: { success, msg },
        } = await this.addBill(this.form)
        console.log(success, msg)
        this.addStatus.success = success
        this.addStatus.msg = msg
        this.snackbar = true
        this.dialog = false
        this.$emit('refresh')
        setTimeout(() => {
          this.snackbar = false
          this.resetForm()
        }, 1000)
      }
    },
    resetForm() {
      this.form = {
        date: '',
        type: '',
        amount: '',
        category: '',
      }
    },
  },
}
</script>

<style lang="stylus" scoped></style>
