<script setup lang="ts">
import { ref, computed } from 'vue'

const n = ref(36)
const iterations = ref(8)
const timeMs = ref<number | null>(null)
const loading = ref(false)

function fibHeavy(x: number): number {
  if (x <= 1) return x
  return fibHeavy(x - 1) + fibHeavy(x - 2)
}

const fibResult = computed(() => fibHeavy(n.value))

async function runTest() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 0))

  try {
    const t0 = performance.now()
    let last = 0
    for (let i = 0; i < iterations.value; i++) {
      last = fibResult.value
    }
    timeMs.value = performance.now() - t0
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="border border-green-200 p-4 rounded-lg">
    <h3 class="font-bold text-green-700 mb-2">✅ Fib — Optimized (computed)</h3>

    <div class="flex gap-2 items-center mb-2">
      <label>N: <input type="number" v-model.number="n" class="w-16 border rounded px-1" /></label>
      <label
        >Iterations:
        <input type="number" v-model.number="iterations" class="w-16 border rounded px-1"
      /></label>
      <button
        @click="runTest"
        :disabled="loading"
        class="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
      >
        Run
      </button>
      <span v-if="loading" class="text-green-700 font-semibold">Process...</span>
    </div>

    <div class="text-sm space-y-1">
      <div>
        Result (computed): <strong>{{ fibResult }}</strong>
      </div>
      <div>
        Time: <strong v-if="timeMs !== null">{{ timeMs.toFixed(2) }} ms</strong
        ><span v-else>—</span>
      </div>
      <div class="text-gray-500">
        {{ $t('cm.fib.optimized') }}
      </div>
    </div>
  </section>
</template>
