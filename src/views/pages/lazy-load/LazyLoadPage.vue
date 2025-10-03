<script setup lang="ts">
import Basic from './components/Basic.vue'
import SuspenseBlock from './components/Suspense.vue'
import Timeout from './components/Timeout.vue'
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">{{ $t('lazy.title') }}</h1>

  <p class="text-lg font-bold mb-6 text-700 mt-6">{{ $t('lazy.description') }}</p>

  <div class="flex flex-col mb-8">
    <h2 class="text-xl font-bold">{{ $t('lazy.define.title') }}</h2>
    <ul class="list-disc list-inside mb-2 text-sm text-gray-700">
      <li>{{ $t('lazy.define.one') }}</li>
    </ul>

    <Basic />
  </div>

  <div class="flex flex-col mb-8">
    <h2 class="text-xl font-bold">{{ $t('lazy.defineOption.title') }}</h2>
    <ul class="list-disc list-inside mb-2 text-sm text-gray-700">
      <li>{{ $t('lazy.defineOption.one') }}</li>
      <li>{{ $t('lazy.defineOption.two') }}</li>
    </ul>
    <Timeout />
  </div>

  <div class="flex flex-col mb-8">
    <h2 class="text-xl font-bold">{{ $t('lazy.defineSuspense.title') }}</h2>
    <ul class="list-disc list-inside mb-2 text-sm text-gray-700">
      <li>{{ $t('lazy.defineSuspense.one') }}</li>
      <li>{{ $t('lazy.defineSuspense.two') }}</li>
    </ul>

    <SuspenseBlock />
  </div>
</template>
