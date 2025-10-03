<template>
  <section class="p-4 border rounded-lg">
    <button @click="show = !show" class="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">
      Toggle component (success)
    </button>

    <div class="mt-4">
      <LazyHello v-if="show" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

const show = ref(false)

const LazyHello = defineAsyncComponent(() => import('./Hello.vue'))
</script>
