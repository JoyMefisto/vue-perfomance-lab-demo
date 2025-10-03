<script setup lang="ts">
import { ref, defineAsyncComponent, h } from 'vue'

const isShowPositive = ref(false)
const isShowNegative = ref(false)

// Create components via render functions
const LoadingComponent = {
  render() {
    return h('div', { class: 'text-yellow-600' }, '⏳ Loading component...')
  },
}

const ErrorComponent = {
  render() {
    return h('div', { class: 'text-red-600' }, '❌ Failed to load component')
  },
}

const LazyProfilePositive = defineAsyncComponent({
  loader: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        // For real usage:
        resolve(import('./Profile.vue'))
      }, 800)
    }),
  delay: 200, // loader will show only if >200ms
  loadingComponent: LoadingComponent,
})

const LazyProfileNegative = defineAsyncComponent({
  loader: () =>
    new Promise((_resolve, reject) => {
      setTimeout(() => {
        // For error testing - uncomment line below
        reject(new Error('Failed to load component'))
      }, 800)
    }),
  delay: 200, // loader will show only if >200ms
  timeout: 5000, // if loading > 5s → error component
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  // Error handler for async component
  onError: (err, retry, fail) => {
    console.error('Async component error:', err)
    fail() // don't attempt to retry loading
  },
})
</script>
<template>
  <section class="p-4 border rounded-lg">
    <button
      @click="isShowPositive = !isShowPositive"
      class="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
    >
      Toggle component (success)
    </button>

    <div class="mt-4 mb-8">
      <LazyProfilePositive v-if="isShowPositive" />
    </div>
    <button
      @click="isShowNegative = !isShowNegative"
      class="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
    >
      Toggle component (error)
    </button>

    <div>
      <LazyProfileNegative class="mt-4" v-if="isShowNegative" />
    </div>
  </section>
</template>
