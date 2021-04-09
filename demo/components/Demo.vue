<template>
  <h1>
    Vue Inline Svg Icon Demo
    <BaseIcon icon="fire" fill="orange" />
  </h1>
  <div>
    <ul>
      <li v-for="feature in list" :key="feature">
        <BaseIcon icon="badge-check" />
        {{ feature }}
      </li>
    </ul>
  </div>
  <button>
    Send
    <BaseIcon icon="send" />
  </button>
  <p class="please-wait">
    <BaseIcon icon="cog-solid" :spin="true" />
    Processing &hellip;
  </p>
  <p class="warning">
    <BaseIcon icon="exclamation" />
    Something went wrong.
  </p>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'Demo',
  components: { BaseIcon },
  setup() {
    const list = [
      'Easy to add or remove icons',
      'No icon font required',
      'Simple syntax',
    ]
    return {
      list,
    }
  },
}
</script>
<style>
h1 .icon {
  color: orange;
}

.please-wait .icon {
  opacity: 0.3;
}

li .icon {
  color: #ff1493;
}

button .icon {
  margin-left: 0.5ch;
  color: #00bfff;
}

.warning .icon {
  font-size: 1.5em;
  margin-right: 0.25em;
  color: #ff8c00;
}

ul {
  display: inline-block;
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin: 0 auto 1em 0;
}

li + li {
  margin-top: 0.25em;
}

button {
  color: #fff;
  font-size: 1em;
  padding: 0.5em 1em;
  background: #667;
  border: 0;
  border-bottom: 2px solid #00bfff;
  border-radius: 4px;
  outline: none;
}

button:hover {
  background: #778;
}

.please-wait,
.warning {
  padding: 1em;
}

.please-wait {
  color: #2f4f4f;
  background: #afeeee;
  border-radius: 8px;
}

.warning {
  border-left: 4px solid #ff8c00;
  background: #fffacd;
  color: #8b4513;
}
</style>
