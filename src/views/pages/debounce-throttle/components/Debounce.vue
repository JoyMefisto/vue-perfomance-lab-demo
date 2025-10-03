<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import debounce from 'lodash/debounce'

// large dataset (simulation)
const ITEMS = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1} — title example ${i % 100}`)

const query = ref('')
const results = ref<string[]>([])
const loading = ref(false)
const requests = ref(0)
const lastLatency = ref<number | null>(null)
const lastQuery = ref<string | null>(null)
const waitMs = ref<number>(300)

// fake API: simulate network delay and filtering (in practice — backend call)
async function fakeSearch(q: string) {
  const t0 = performance.now()
  // simulated network delay
  await new Promise((r) => setTimeout(r, 250))
  // local filtering — heavy op on large array (demo)
  const res = q ? ITEMS.filter((x) => x.toLowerCase().includes(q.toLowerCase())).slice(0, 50) : []
  const dt = performance.now() - t0
  return { res, dt }
}

async function doSearch(q: string) {
  requests.value++
  lastQuery.value = q
  loading.value = true
  try {
    const { res, dt } = await fakeSearch(q)
    results.value = res
    lastLatency.value = dt
  } finally {
    loading.value = false
  }
}

// lodash debounce wrapper — use current waitMs
let debounced = debounce((q: string) => {
  void doSearch(q)
}, waitMs.value)
watch(waitMs, (nw) => {
  // recreate debounce when wait changes
  debounced.cancel()
  debounced = debounce((q: string) => {
    void doSearch(q)
  }, nw)
})

watch(query, (q) => {
  debounced(q)
})

// force immediate
function forceSearch() {
  debounced.cancel()
  void doSearch(query.value)
}

onBeforeUnmount(() => {
  debounced.cancel()
})
</script>

<template>
  <section class="p-4 border rounded-lg">
    <h3 class="font-semibold mb-2">Debounce — Search (lodash)</h3>
    <p class="text-sm text-gray-600 mb-3">
      {{ $t('dt.debounce.description') }}
    </p>

    <div class="flex gap-2 items-center mb-3">
      <input
        v-model="query"
        type="search"
        placeholder="Type to search... 1"
        class="border rounded px-2 py-1 w-72"
      />
      <label class="text-sm"
        >Wait:
        <input type="number" v-model.number="waitMs" class="w-20 ml-1 border rounded px-1 py-0.5" />
        ms
      </label>
      <button
        @click="forceSearch"
        class="ml-2 bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
      >
        Force
      </button>
      <span v-if="loading" class="ml-3 text-yellow-600 font-medium">Process...</span>
    </div>

    <div class="flex gap-4 text-sm mb-3">
      <div>
        Requests: <strong>{{ requests }}</strong>
      </div>
      <div>
        Last query: <strong>{{ lastQuery ?? '—' }}</strong>
      </div>
      <div>
        Last latency: <strong v-if="lastLatency !== null">{{ lastLatency.toFixed(1) }} ms</strong
        ><span v-else>—</span>
      </div>
    </div>

    <div class="h-56 overflow-auto border rounded p-2">
      <ul class="space-y-1">
        <li v-for="r in results" :key="r" class="text-sm">{{ r }}</li>
        <li v-if="results.length === 0" class="text-gray-500">No results</li>
      </ul>
    </div>
  </section>
</template>
