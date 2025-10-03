<script setup lang="ts">
import { ref, nextTick } from 'vue'

const counter = ref(0)
const lastDuration = ref<number | null>(null)

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)

async function increment() {
  const t0 = performance.now()

  counter.value++

  await nextTick()

  lastDuration.value = (performance.now() - t0).toFixed(2) as unknown as number
}
</script>

<template>
  <h2 class="text-lg font-bold text-700 mt-6">{{ $t('render.notOptimized.title') }}</h2>
  <section class="mb-8 border p-4 rounded border-red-300">
    <h3 class="mb-4">❌ Not Optimized</h3>
    <div class="mb-4 flex gap-4">
      <button class="bg-blue-500 text-white py-1 px-3 rounded cursor-pointer" @click="increment">
        Count: {{ counter }}
      </button>
      <div class="flex items-center gap-1">
        Last update: <strong v-if="lastDuration !== null">{{ lastDuration }} ms</strong
        ><span v-else>—</span>
      </div>
    </div>

    <div class="border rounded border-gray-300 p-2 h-72 overflow-auto">
      <ul>
        <li v-for="item in items" :key="item" class="py-1">{{ item }}</li>
      </ul>
    </div>

    <ul class="mt-4 list-disc list-inside text-xs text-gray-600">
      <li>{{ $t('render.notOptimized.one') }}</li>
      <li>{{ $t('render.notOptimized.two') }}</li>
    </ul>
  </section>
</template>
