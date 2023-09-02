# Sample

<script setup>
import Modal from '../components/Modal.vue'
</script>

## Code Group
::: code-group

```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

:::

## Demo Block
<DemoBlock src="demos/button/Demo1.vue" />

<Modal />

## Text Tip

`test`

::: details Getting missing peer deps warnings?
If using PNPM, you will notice a missing peer warning for `@docsearch/js`. This does not prevent VitePress from working. If you wish to suppress this warning, add the following to your `package.json`:

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search",
      "search-insights"
    ]
  }
}
```

:::

::: tip NOTE

VitePress is an ESM-only package. Don't use `require()` to import it, and make sure your nearest `package.json` contains `"type": "module"`, or change the file extension of your relevant files like `.vitepress/config.js` to `.mjs`/`.mts`. Refer to [Vite's troubleshooting guide](http://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only) for more details. Also, inside async CJS contexts, you can use `await import('vitepress')` instead.

:::

