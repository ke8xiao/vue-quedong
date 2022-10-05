<template>
  <div id="app">
    <Header />
    <Aside />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'

export default {
  name: 'App',
  components: {
    Header,
    Aside
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  height: 100%;
}
@import url('./assets/style/common.css');
</style>
