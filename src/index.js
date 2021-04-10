import InlineSvgComponent from './InlineSvg.vue'

const InlineSvgPlugin = {
  install(app) {
    app.component('inline-svg', InlineSvgComponent)
  },
}

export { InlineSvgComponent as default, InlineSvgComponent, InlineSvgPlugin }
