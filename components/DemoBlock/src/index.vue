<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import NotFound from '../../NotFound'
import HighLightCode from '../../HighLightCode'

interface Props {
  src: string
  source: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  source: '',
})

const resolveDemosPath = (path: string) => path.substring(path.indexOf('demos'))

let DemoComp = NotFound

const modules = import.meta.glob('demos/*/*.vue')
const files = Object.keys(modules).reduce((pre: Record<string, () => any>, cur: string) => {
  const key = resolveDemosPath(cur)
  pre[key] = modules[cur]
  return pre
}, {})

const file = files[resolveDemosPath(props.src)]

if (file) {
  DemoComp = defineAsyncComponent(file)
}

const code = computed(() => decodeURIComponent(props.source))

const showCode = ref(false)

const copied = ref(false)
const { copy } = useClipboard({ source: code.value })
const handleCopy = async () => {
  try {
    await copy()
    copied.value = true
  } catch (err) {
    console.error(err)
    copied.value = false
  }
}

const handleLeaveCheck = () => {
  setTimeout(() => {
    copied.value = false
  }, 200)
}
</script>

<template>
  <div w-full b-solid b-1 b-gray-200 b-rounded px-2 py-2 my-4>
    <div py-2>
      <DemoComp />
    </div>
    <Transition>
      <div v-show="showCode" b-t-1 b-t-solid b-gray-200>
        <HighLightCode :code="code" />
      </div>
    </Transition>
    <div flex justify-end items-center pt-2 b-t-1 b-t-solid b-gray-200>
      <div title="show source code" i-carbon-code mx-2 cursor-pointer c-gray-500 @click="showCode = !showCode" />
      <div v-if="!copied" title="copy source code" i-carbon-copy-file mx-2 cursor-pointer c-gray-500
        @click="handleCopy" />
      <div v-else title="copy source code" i-carbon-checkmark mx-2 cursor-pointer c-green
        @mouseleave="handleLeaveCheck" />
      <a href="https://github.com/fightwithtiger/starter-docs" target="_blank" mx-2>
        <div title="open in github" i-carbon-logo-github c-gray-500 />
      </a>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
