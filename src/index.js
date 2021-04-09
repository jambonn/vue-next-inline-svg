import InlineSvgComponent from './InlineSvg.vue'

const InlineSvgPlugin = {
  install(Vue) {
    Vue.component('inline-svg', InlineSvgComponent)
  },
}

export { InlineSvgComponent as default, InlineSvgComponent, InlineSvgPlugin }
