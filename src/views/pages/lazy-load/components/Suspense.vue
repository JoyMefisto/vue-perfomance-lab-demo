<script setup lang="ts">
// https://github.com/fengyuanchen/vue-feather/issues/8
import { ref, defineAsyncComponent, onErrorCaptured, h } from 'vue'

const isShowPositive = ref(false)
const isShowNegative = ref(false)
const error = ref<Error | null>(null)

// Error handler for Suspense
onErrorCaptured((err) => {
  error.value = err
  return false // prevent further error propagation
})

const ErrorComponent = {
  render() {
    return h('div', { class: 'text-red-600' }, '❌ Failed to load component')
  },
}

const LazyProfilePositive = defineAsyncComponent({
  loader: () =>
    new Promise<typeof import('./Profile.vue')>((resolve) => {
      setTimeout(() => {
        // For real usage:
        resolve(import('./Profile.vue'))
      }, 800)
    }),
})

const LazyProfileNegative = defineAsyncComponent({
  loader: () =>
    new Promise((_resolve, reject) => {
      setTimeout(() => {
        // For error testing - uncomment line below
        reject(new Error('Failed to load component'))
      }, 800)
    }),
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
      <Suspense
        v-if="isShowPositive"
        @pending="console.log('Suspense pending')"
        @resolve="console.log('Suspense resolved')"
        @fallback="console.log('Suspense fallback')"
      >
        <template #default>
          <LazyProfilePositive />
        </template>
        <template #fallback>
          <div class="text-yellow-600">⏳ Loading profile...</div>
        </template>
      </Suspense>
    </div>

    <button
      @click="isShowNegative = !isShowNegative"
      class="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
    >
      Toggle component (error)
    </button>

    <div class="mt-4">
      <Suspense
        v-if="isShowNegative"
        @pending="console.log('Suspense pending')"
        @resolve="console.log('Suspense resolved')"
        @fallback="console.log('Suspense fallback')"
      >
        <template #default>
          <LazyProfileNegative />
        </template>
        <template #fallback>
          <div class="text-yellow-600">⏳ Loading profile...</div>
        </template>
      </Suspense>
    </div>
  </section>
</template>
