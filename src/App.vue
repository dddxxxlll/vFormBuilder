<template>
  <div id="app">
    <Demo></Demo>
  </div>
</template>

<script>
import Demo from './views/demo'

export default {
  name: 'App',
  components: {
    Demo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
html,body {
  height: 100%;
}
</style>
