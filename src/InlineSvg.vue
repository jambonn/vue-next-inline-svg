<template>
  <svg
    v-if="svgElSource"
    ref="inlineSvg"
    v-bind="Object.assign({}, getSvgAttrs(svgElSource), filterAttrs($attrs))"
    v-html="getSvgContent(svgElSource)"
  ></svg>
  <svg v-else></svg>
</template>

<script>
import { ref, toRef, nextTick, watch, onMounted } from 'vue'

/** @type Object{string: Promise<Element>} */
const cache = {}

export default {
  name: 'InlineSvg',
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    transformSource: {
      type: Function,
      default: svg => svg,
    },
    keepDuringLoading: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['unloaded', 'loaded', 'error'],
  setup(props, ctx) {
    const src = toRef(props, 'src')
    // type SVGElement
    const svgElSource = ref(null)

    // ref template
    const inlineSvg = ref(null)

    const getSvgAttrs = svgEl => {
      // copy attrs
      let svgAttrs = {}
      const attrs = svgEl.attributes
      if (!attrs) {
        return svgAttrs
      }
      for (let i = attrs.length - 1; i >= 0; i--) {
        svgAttrs[attrs[i].name] = attrs[i].value
      }
      return svgAttrs
    }
    /**
     * Create or edit the <title> element of a SVG
     * @param {SVGElement} svg
     * @param {string} title
     */
    const setTitle = (svg, title) => {
      const titleTags = svg.getElementsByTagName('title')
      if (titleTags.length) {
        // overwrite existing title
        titleTags[0].textContent = title
      } else {
        // create a title element if one doesn't already exist
        const titleEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'title',
        )
        titleEl.textContent = title
        svg.appendChild(titleEl)
      }
    }
    const getSvgContent = svgEl => {
      svgEl = svgEl.cloneNode(true)
      svgEl = props.transformSource(svgEl)
      if (props.title) {
        setTitle(svgEl, props.title)
      }

      // copy inner html
      return svgEl.innerHTML
    }
    /**
     * Get svgElSource
     * @param {string} src
     */
    const getSource = src => {
      // fill cache by src with promise
      if (!cache[src]) {
        // download
        cache[src] = download(src)
      }
      // notify svg is unloaded
      if (
        svgElSource.value &&
        cache[src].isPending() &&
        !props.keepDuringLoading
      ) {
        svgElSource.value = null
        ctx.emit('unloaded')
      }

      // inline svg when cached promise resolves
      cache[src]
        .then(svg => {
          svgElSource.value = svg
          // wait to render
          nextTick(() => {
            // notify
            ctx.emit('loaded', inlineSvg.value)
          })
        })
        .catch(err => {
          // notify svg is unloaded
          if (svgElSource.value) {
            svgElSource.value = null
            ctx.emit('unloaded')
          }
          // remove cached rejected promise so next image can try load again
          delete cache[src]
          ctx.emit('error', err)
        })
    }

    /**
     * This function allow you to modify a JS Promise by adding some status properties.
     */
    const makePromiseState = promise => {
      // Don't modify any promise that has been already modified.
      if (promise.isPending) return promise

      // Set initial state
      let isPending = true

      // Observe the promise, saving the fulfillment in a closure scope.
      let result = promise.then(
        v => {
          isPending = false
          return v
        },
        e => {
          isPending = false
          throw e
        },
      )

      result.isPending = function getIsPending() {
        return isPending
      }
      return result
    }

    /**
     * Get the contents of the SVG
     * @param {string} url
     * @returns {Promise<Element>}
     */
    const download = url => {
      return makePromiseState(
        new Promise((resolve, reject) => {
          const request = new XMLHttpRequest()
          request.open('GET', url, true)

          request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
              try {
                // Setup a parser to convert the response to text/xml in order for it to be manipulated and changed
                const parser = new DOMParser()
                const result = parser.parseFromString(
                  request.responseText,
                  'text/xml',
                )
                let svgEl = result.getElementsByTagName('svg')[0]
                if (svgEl) {
                  resolve(svgEl)
                } else {
                  reject(new Error('Loaded file is not valid SVG"'))
                }
              } catch (e) {
                reject(e)
              }
            } else {
              reject(new Error('Error loading SVG'))
            }
          }

          request.onerror = reject
          request.send()
        }),
      )
    }
    /**
     * Remove false attrs
     * @param {Object} attrs
     */
    const filterAttrs = attrs => {
      return Object.keys(attrs).reduce((result, key) => {
        if (
          attrs[key] !== false &&
          attrs[key] !== null &&
          attrs[key] !== undefined
        ) {
          result[key] = attrs[key]
        }
        return result
      }, {})
    }

    onMounted(() => {
      // generate `svgElSource`
      getSource(src.value)
    })
    watch(src, value => {
      // re-generate cached svg (`svgElSource`)
      getSource(value)
    })

    return {
      inlineSvg,
      svgElSource,
      filterAttrs,
      getSvgAttrs,
      getSvgContent,
    }
  },
}
</script>
