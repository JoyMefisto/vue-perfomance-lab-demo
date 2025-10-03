<script setup lang="ts">
import Debounce from './components/Debounce.vue'
import Throttle from './components/Throttle.vue'
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">{{ $t('dt.title') }}</h1>

  <p class="text-lg font-bold mb-6 text-700 mt-6">
    {{ $t('dt.description') }}
  </p>
  <h1 class="text-2xl font-bold">{{ $t('dt.short.title') }}</h1>

  <ul class="list-disc list-inside mb-8 text-sm text-gray-700">
    <li>{{ $t('dt.short.one') }}</li>
    <li>{{ $t('dt.short.two') }}</li>
  </ul>

  <div class="flex flex-col mb-8">
    <h2 class="text-xl font-bold">{{ $t('dt.debounce.title') }}</h2>
    <ul class="list-disc list-inside mb-8 text-sm text-gray-700">
      <li>{{ $t('dt.debounce.one') }}</li>
      <li>{{ $t('dt.debounce.two') }}</li>
      <li>{{ $t('dt.debounce.three') }}</li>
    </ul>

    <Debounce />
  </div>
  <div class="flex flex-col mb-8">
    <h2 class="text-xl font-bold">{{ $t('dt.throttle.title') }}</h2>
    <ul class="list-disc list-inside mb-8 text-sm text-gray-700">
      <li>{{ $t('dt.throttle.one') }}</li>
      <li>{{ $t('dt.throttle.two') }}</li>
      <li>{{ $t('dt.throttle.three') }}</li>
    </ul>
    <Throttle />
  </div>
</template>
