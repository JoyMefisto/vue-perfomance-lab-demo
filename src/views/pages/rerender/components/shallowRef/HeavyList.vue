<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item" style="padding: 4px 0">
      {{ item }}
    </li>
  </ul>
</template>
