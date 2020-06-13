<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">简单记账本</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <table-content />
    </v-main>
  </v-app>
</template>

<script>
import TableContent from './components/table-content'
export default {
  name: 'App',
  components: {
    TableContent,
  },
  data: () => ({}),
}
</script>
<style lang="stylus">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
