// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import 'uno.css'
import HighLightCode from '../../components/HighLightCode'
import DemoBlock from '../../components/DemoBlock'
import './style.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('HighlightCode', HighLightCode)
    app.component('DemoBlock', DemoBlock)
  },
}
