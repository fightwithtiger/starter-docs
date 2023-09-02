<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import hljs from 'highlight.js'
import { escapeHtml } from '../../../utils'

interface Props {
  code: string
  language?: string
  autodetect?: boolean
  ignoreIllegals?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: '',
  autodetect: true,
  ignoreIllegals: true,
})

const language = ref(props.language)
watch(
  () => props.language,
  (newLanguage) => {
    language.value = newLanguage
  },
)

const autodetect = computed(() => props.autodetect && !language.value)
const cannotDetectLanguage = computed(
  () => !autodetect.value && !hljs.getLanguage(language.value),
)

const className = computed((): string => {
  if (cannotDetectLanguage.value) {
    return ''
  } else {
    return `hljs ${language.value}`
  }
})

const highlightedCode = computed((): string => {
  if (cannotDetectLanguage.value) {
    console.warn(`The language "${language.value}" you specified could not be found.`)
    return escapeHtml(props.code)
  }

  if (autodetect.value) {
    const result = hljs.highlightAuto(props.code)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    language.value = result.language ?? ''
    return result.value
  } else {
    const result = hljs.highlight(props.code, {
      language: language.value,
      ignoreIllegals: props.ignoreIllegals,
    })
    return result.value
  }
})
</script>

<template>
  <pre><code text-sm :class="className" v-html="highlightedCode" /></pre>
</template>

<style>
@import '../../../assets/styles/atom-one-light.css';
@import '../../../assets/styles/atom-one-dark.css';
</style>
