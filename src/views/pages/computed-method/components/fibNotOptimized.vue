<script setup lang="ts">
import { ref } from 'vue'

const n = ref(36)
const iterations = ref(8)
const result = ref<number | null>(null)
const timeMs = ref<number | null>(null)
const loading = ref(false)

function fib(x: number): number {
  if (x <= 1) return x
  return fib(x - 1) + fib(x - 2)
}

async function runTest() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 0))

  try {
    const t0 = performance.now()
    let last = 0
    for (let i = 0; i < iterations.value; i++) {
      last = fib(n.value)
    }
    result.value = last
    timeMs.value = performance.now() - t0
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="border border-red-200 p-4 rounded-lg">
    <h3 class="font-bold text-red-700 mb-2">❌ Fib — Not Optimized (method)</h3>

    <div class="flex gap-2 items-center mb-2">
      <label>N: <input type="number" v-model.number="n" class="w-16 border rounded px-1" /></label>
      <label
        >Iterations:
        <input type="number" v-model.number="iterations" class="w-16 border rounded px-1"
      /></label>
      <button
        @click="runTest"
        :disabled="loading"
        class="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
      >
        Run
      </button>
      <span v-if="loading" class="text-orange-600 font-semibold">Process...</span>
    </div>

    <div class="text-sm space-y-1">
      <div>
        Result: <strong>{{ result ?? '—' }}</strong>
      </div>
      <div>
        Time: <strong v-if="timeMs !== null">{{ timeMs.toFixed(2) }} ms</strong
        ><span v-else>—</span>
      </div>
      <div class="text-gray-500">
        {{ $t('cm.fib.notOptimized') }}
      </div>
    </div>
  </section>
</template>
