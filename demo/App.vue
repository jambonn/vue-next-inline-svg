<template>
  <div class="logo">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="action">
      <a
        href="https://github.com/FrontLabsOfficial/vue-inline-svg#install"
        class="button"
      >
        Get started
      </a>
      <a
        href="https://github.com/FrontLabsOfficial/vue-inline-svg#readme"
        class="button white"
      >
        Github
        <BaseIcon icon="github" />
      </a>
    </div>
  </div>
  <Demo />
</template>

<script>
import Demo from './components/Demo.vue'
import BaseIcon from './components/BaseIcon.vue'

export default {
  name: 'App',
  components: { Demo, BaseIcon },
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
.logo,
.action {
  text-align: center;
}

button,
.button {
  color: #fff;
  font-size: 1em;
  padding: 0.5em 1em;
  background: #667;
  border: 0;
  border-bottom: 2px solid #00bfff;
  border-radius: 4px;
  outline: none;
  text-decoration: none;
}

button:first-child,
.button:first-child {
  margin-right: 1em;
}

button:hover,
.button:hover {
  background: #778;
}

.button.white {
  border-width: 1px 1px 2px 1px;
  border-color: #667;
  border-style: solid;
  background-color: #fff;
  color: #667;
}
</style>
