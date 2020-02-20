<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from './components/Home.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="scss">
  @import url('./assets/css/style.module.css');
</style>
