<template>
  <div class="logo">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
  <Demo />
</template>

<script>
import Demo from './components/Demo.vue'

export default {
  name: 'App',
  components: { Demo },
}
</script>

<style>
[id='app'] {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 768px;
  margin: auto;
}
@media (min-width: 768px) {
  [id='app'] {
    font-size: 24px;
  }
}
.logo {
  text-align: center;
}
</style>
