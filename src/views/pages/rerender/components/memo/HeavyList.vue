<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ items: string[] }>()

// Non-reactive render counter (not ref!)
let renderCount = 0
function getRenderCount() {
  // increment counter on each render (function called in template)
  renderCount += 1
  return renderCount
}
</script>

<template>
  <div>
    <div style="margin-bottom: 8px; font-size: 13px; color: #444">
      HeavyList renders: <strong>{{ getRenderCount() }}</strong>
    </div>

    <!-- v-memo will protect entire list from re-rendering if items haven't changed (reference/value) -->
    <ul v-memo="[props.items]">
      <li v-for="item in props.items" :key="item" style="padding: 4px 0">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
