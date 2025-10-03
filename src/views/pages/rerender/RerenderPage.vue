<script setup lang="ts">
import NotOptimized from './components/NotOptimized.vue'
import OptimizedMemo from './components/memo/Optimized.vue'
import OptimizedShallowRef from './components/shallowRef/Optimized.vue'
import OptimizedFunctional from './components/functional/Optimized.vue'
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">{{ $t('render.title') }}</h1>
  <p class="text-lg font-bold mb-6 text-700">{{ $t('render.description1') }}</p>

  <i18n-t keypath="render.description2" tag="p" class="text-lg font-bold mb-6 text-700 mt-6">
    <template #link>
      <a href="https://vuejs.org/guide/extras/rendering-mechanism#render-pipeline" target="_blank">
        {{ $t('render.description2Link') }}
      </a>
    </template>
  </i18n-t>

  <p class="text-lg font-bold mb-6 text-700 mt-6">{{ $t('render.description3') }}</p>

  <hr class="mb-4" />

  <div class="flex flex-col">
    <NotOptimized />
    <OptimizedMemo />

    <h1 class="text-2xl font-bold mb-2">
      {{ $t('render.explanation1.title') }}
    </h1>
    <ul class="list-disc list-inside mb-8 text-sm text-gray-700">
      <li>{{ $t('render.explanation1.one') }}</li>
      <li>
        {{ $t('render.explanation1.two') }}

        <ul class="list-disc list-inside pl-4 text-sm text-gray-700">
          <li>{{ $t('render.explanation1.three') }}</li>
          <li>{{ $t('render.explanation1.four') }}</li>
        </ul>
      </li>
      <li>{{ $t('render.explanation1.five') }}</li>
    </ul>

    <hr class="mb-4" />

    <OptimizedShallowRef />
    <OptimizedFunctional />

    <h1 class="text-2xl font-bold mb-2">
      {{ $t('render.explanation2.title') }}
    </h1>
    <ul class="list-disc list-inside mb-8 text-sm text-gray-700">
      <li>{{ $t('render.explanation2.one') }}</li>
      <li>{{ $t('render.explanation2.two') }}</li>
    </ul>
  </div>
</template>
