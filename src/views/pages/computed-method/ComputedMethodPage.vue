<script setup lang="ts">
import FibNotOptimized from './components/fibNotOptimized.vue'
import FibOptimized from './components/fibOptimized.vue'
import FilterNotOptimized from './components/filterNotOptimized.vue'
import FilterOptimized from './components/filterOptimized.vue'
</script>
<template>
  <div class="wrapper">
    <h1 class="text-2xl font-bold mb-6">{{ $t('cm.title') }}</h1>

    <p class="text-lg font-bold mb-6 text-700">
      {{ $t('cm.description') }}
    </p>

    <h2 class="text-lg font-bold text-700 mt-6">{{ $t('cm.fib.title') }}</h2>
    <ul class="list-disc list-inside text-xs text-gray-600">
      <li>{{ $t('cm.fib.one') }}</li>
      <li>{{ $t('cm.fib.two') }}</li>
      <li>{{ $t('cm.fib.three') }}</li>
      <li>{{ $t('cm.fib.four') }}</li>
      <li>{{ $t('cm.fib.five') }}</li>
    </ul>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <FibNotOptimized />
      <FibOptimized />
    </div>

    <h2 class="text-lg font-bold text-700 mt-6">{{ $t('cm.filter.title') }}</h2>
    <ul class="list-disc list-inside text-xs text-gray-600">
      <li>{{ $t('cm.filter.one') }}</li>
      <li>{{ $t('cm.filter.two') }}</li>
      <li>{{ $t('cm.filter.three') }}</li>
      <li>{{ $t('cm.filter.four') }}</li>
      <li>{{ $t('cm.filter.five') }}</li>
      <li>{{ $t('cm.filter.six') }}</li>
    </ul>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <FilterNotOptimized />
      <FilterOptimized />
    </div>
  </div>
</template>
