<script setup lang="ts">
import { ref } from 'vue'

const size = ref(30000)
const iterations = ref(10)
const query = ref('123')
const resultLen = ref<number | null>(null)
const timeMs = ref<number | null>(null)
const loading = ref(false)

const items = Array.from({ length: size.value }, (_, i) => i.toString())

async function runTest() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 0))

  try {
    const t0 = performance.now()
    let lastLen = 0
    for (let i = 0; i < iterations.value; i++) {
      const filtered = items.filter((x) => x.includes(query.value))
      lastLen = filtered.length
    }
    timeMs.value = performance.now() - t0
    resultLen.value = lastLen
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="border border-pink-200 p-4 rounded-lg">
    <h3 class="font-bold text-pink-700 mb-2">❌ Filter — Not Optimized (method)</h3>

    <div class="flex gap-2 items-center mb-2">
      <label
        >Size: <input type="number" v-model.number="size" class="w-20 border rounded px-1"
      /></label>
      <label
        >Iterations:
        <input type="number" v-model.number="iterations" class="w-16 border rounded px-1"
      /></label>
      <label>Query: <input v-model="query" class="w-28 border rounded px-1" /></label>
      <button
        @click="runTest"
        :disabled="loading"
        class="bg-pink-500 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
      >
        Run
      </button>
      <span v-if="loading" class="text-pink-700 font-semibold">Process...</span>
    </div>

    <div class="text-sm space-y-1">
      <div>
        Matches: <strong>{{ resultLen ?? '—' }}</strong>
      </div>
      <div>
        Time: <strong v-if="timeMs !== null">{{ timeMs.toFixed(2) }} ms</strong
        ><span v-else>—</span>
      </div>
      <div class="text-gray-500">{{ $t('cm.filter.notOptimized') }}</div>
    </div>
  </section>
</template>
