# Vue Inline SVG

Vue component loads an SVG source dynamically and inline `<svg>` so you can manipulate the style of it with CSS or JS.
It looks like basic `<img>` so you markup will not be bloated with SVG content.
Loaded SVGs are cached so it will not make network request twice.

- [Install](#install)
    - [NPM](#npm)
    - [CDN](#cdn)
- [Usage](#usage)
    - [props](#props)
        - [src](#--src)
        - [title](#--title)
        - [keepDuringLoading](#--keepduringloading)
        - [transformSource](#--transformsource)
    - [SVG attributes](#svg-attributes)
    - [events](#events)
        - [loaded](#--loaded)
        - [unloaded](#--unloaded)
        - [error](#--error)
- [License](#license)


## Install

### NPM

```bash
npm install @jambonn/vue-inline-svg
```

Register locally in your component
```js
import InlineSvg from '@jambonn/vue-inline-svg';

// Your component
export default {
    components: {
      InlineSvg,
    }
}
```

Or register globally in the root Vue instance
```js
import { createApp } from 'vue'
// as a component
import InlineSvg from '@jambonn/vue-inline-svg';

const app = createApp(App);
app.component('vue-inline-svg', InlineSvg);
app.mount('#app')
```


### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<!-- Include the `vue-inline-svg` script on your page after Vue script -->
<script src="https://unpkg.com/@jambonn/vue-inline-svg"></script>

<script>
const app = Vue.createApp({})
// Register as a component
app.component('inline-svg', VueInlineSvg);
</script>
```

## Usage

```html
<inline-svg
    src="image.svg"
    transformSource="transformSvg"
    @loaded="svgLoaded($event)"
    @unloaded="svgUnloaded()"
    @error="svgLoadError($event)"
    width="150" 
    height="150"
    fill="black"
    aria-label="Icon"
></inline-svg>
``` 
[Example](https://github.com/shrpne/vue-inline-svg/blob/master/demo/index.html)


### props
#### - `src`
Path to SVG file

```html
<inline-svg src="/my.svg"/>
```

Note: if you use vitejs, then paths like '../assets/my.svg' will not be handled by file-loader automatically like vitejs do for `<img>` tag, so you will need to use it with `import.meta.globEager()`:
```html
<inline-svg :src="`${icons['/assets/icons/my.svg'].default}`" />
<script>
  const icons = import.meta.globEager('/assets/icons/my.svg')

  export default {
    setup() {
      return { icons }
    },
  }
</script>
```
Learn more:
- https://vitejs.dev/guide/features.html#glob-import

Note: if you use vue-loader assets or vue-cli, then paths like '../assets/my.svg' will not be handled by file-loader automatically like vue-cli do for `<img>` tag, so you will need to use it with `require`:
```html
<inline-svg :src="require('../assets/my.svg')"/>
```
Learn more:
- https://vue-loader.vuejs.org/guide/asset-url.html#transform-rules
- https://cli.vuejs.org/guide/html-and-static-assets.html#static-assets-handling

#### - `title`
Sets/overwrites the `<title>` of the SVG

```html
<inline-svg :src="image.svg" title="My Image"/>
```


#### - `keepDuringLoading`
`true` by default. It makes vue-inline-svg to preserve old image visible, when new image is being loaded. Pass `false` to disable it and show nothing during loading.

```html
<inline-svg :src="image.svg" :keepDuringLoading="false"/>
```

#### - `transformSource`
Function to transform SVG source

This example create circle in svg:
```html
<inline-svg :src="image.svg" :transformSource="transform"/>

<script>
const transform = (svg) => {
    let point = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        point.setAttributeNS(null, 'cx', '20');
        point.setAttributeNS(null, 'cy', '20');
        point.setAttributeNS(null, 'r', '10');
        point.setAttributeNS(null, 'fill', 'red');
        svg.appendChild(point);
    return svg;
}
// For cleaner syntax you could use https://github.com/svgdotjs/svg.js
</script>
```


### SVG attributes
Other SVG and HTML attributes will be passed to inlined `<svg>`. Except attributes with `false` or `null` value.
```html
<!-- input -->
<inline-svg 
    fill-opacity="0.25" 
    :stroke-opacity="myStrokeOpacity"
    :color="false"        
></inline-svg>

<!-- output -->
<svg fill-opacity="0.25" stroke-opacity="0.5"></svg>
``` 


### events
#### - `loaded`
Called when SVG image is loaded and inlined.
Inlined SVG element passed as argument into the listener’s callback function.
```html
<inline-svg @loaded="myInlinedSvg = $event"/>
```

#### - `unloaded`
Called when `src` prop was changed and another SVG start loading.
```html
<inline-svg @unloaded="handleUnloaded()"/>
```

#### - `error`
Called when SVG failed to load.
Error object passed as argument into the listener’s callback function.
```html
<inline-svg @error="log($event)"/>
```

## License

MIT License
