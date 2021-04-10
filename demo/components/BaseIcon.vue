<template>
  <InlineSvg
    :class="['icon', { 'icon-spin': spin }]"
    :src="`${icons[`../assets/icons/${icon}.svg`].default}`"
    v-bind="$attrs"
  />
</template>

<script>
import InlineSvg from '../../src/index.js'

const icons = import.meta.globEager('../assets/icons/*.svg')

export default {
  name: 'BaseIcon',
  inheritAttrs: false,
  components: { InlineSvg },
  props: {
    icon: {
      type: String,
      required: true,
    },
    spin: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { icons }
  },
}
</script>

<style>
svg.icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin-bottom: 0.125em;
  fill: currentColor;
}

svg.icon-spin {
  -webkit-animation: icon-spin 2s linear infinite;
  animation: icon-spin 2s linear infinite;
}

@-webkit-keyframes icon-spin {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes icon-spin {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
