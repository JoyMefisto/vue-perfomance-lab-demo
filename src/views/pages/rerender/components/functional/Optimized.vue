<script setup lang="ts">
import { ref } from 'vue'
import HeavyList from './HeavyList.functional'

const counter = ref(0)
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)

const time = ref(0)

const increment = () => {
  const start = performance.now()
  counter.value++
  const end = performance.now()
  time.value = end - start
}
</script>

<template>
  <h2 class="text-lg font-bold text-700 mt-6">{{ $t('render.optimizedFunc.title') }}</h2>
  <section class="mb-8 border p-4 rounded border-green-300">
    <h3 class="mb-4">🔹 Optimized (functional component)</h3>
    <div class="mb-4 flex gap-4">
      <button class="bg-blue-500 text-white py-1 px-3 rounded cursor-pointer" @click="increment">
        Count: {{ counter }}
      </button>
      <div class="flex items-center gap-1">
        Last update: <strong v-if="time !== 0">{{ time.toFixed(2) }} ms</strong
        ><span v-else>—</span>
      </div>
    </div>

    <div class="border rounded border-gray-300 p-2 h-72 overflow-auto">
      <HeavyList :items="items" />
    </div>

    <ul class="mt-4 list-disc list-inside text-xs text-gray-600">
      <li>{{ $t('render.optimizedFunc.one') }}</li>
      <li>{{ $t('render.optimizedFunc.two') }}</li>
      <li>{{ $t('render.optimizedFunc.three') }}</li>
      <li>{{ $t('render.optimizedFunc.four') }}</li>
    </ul>
  </section>
</template>
