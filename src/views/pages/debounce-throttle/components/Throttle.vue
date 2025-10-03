<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue'
import throttle from 'lodash/throttle'

const requests = ref(0)
const lastLatency = ref<number | null>(null)
const loading = ref(false)
const waitMs = ref(1000)

async function heavyAction() {
  loading.value = true
  const t0 = performance.now()
  await new Promise((r) => setTimeout(r, 350))
  lastLatency.value = performance.now() - t0
  requests.value++
  loading.value = false
}

let throttled = throttle(
  () => {
    void heavyAction()
  },
  waitMs.value,
  { leading: true, trailing: false },
)

watch(waitMs, (nw) => {
  throttled.cancel()
  throttled = throttle(
    () => {
      void heavyAction()
    },
    nw,
    { leading: true, trailing: false },
  )
})

function onClick() {
  throttled()
}

onBeforeUnmount(() => {
  throttled.cancel()
})
</script>
<template>
  <section class="p-4 border rounded-lg">
    <h3 class="font-semibold mb-2">Throttle — Button (lodash)</h3>
    <p class="text-sm text-gray-600 mb-3">
      {{ $t('dt.throttle.description') }}
    </p>

    <div class="flex items-center gap-3 mb-3">
      <button @click="onClick" class="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer">
        Trigger
      </button>
      <label class="text-sm"
        >Wait:
        <input type="number" v-model.number="waitMs" class="w-24 ml-1 border rounded px-1 py-0.5" />
        ms
      </label>
      <span v-if="loading" class="text-yellow-600 font-medium ml-2">Processing...</span>
    </div>

    <div class="text-sm">
      <div>
        Requests: <strong>{{ requests }}</strong>
      </div>
      <div>
        Last latency: <strong v-if="lastLatency !== null">{{ lastLatency.toFixed(1) }} ms</strong
        ><span v-else>—</span>
      </div>
    </div>
  </section>
</template>
