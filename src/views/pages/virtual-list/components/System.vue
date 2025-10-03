<script setup lang="ts">
const specs = {
  cpu: '8 cores',
  ram: '16 GB',
  browser: 'Version: 140.0.7339.133 (arm64)',
  platform: 'macOS',
}
</script>
<template>
  <div class="system-specs mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <h3 class="text-lg font-semibold mb-3 text-blue-900">{{ $t('virtual.spec.title') }}</h3>

    <div class="mb-3 p-3 bg-yellow-50 rounded border border-yellow-200">
      <p class="text-xs text-yellow-800 text-center">
        {{ $t('virtual.spec.important') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
      <!-- cpu -->
      <div class="bg-white p-3 rounded border border-blue-100">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span class="font-semibold text-blue-800">{{ $t('virtual.spec.cpu') }}</span>
        </div>
        <div class="text-gray-700 text-xs">{{ specs.cpu }}</div>
      </div>

      <!-- ram -->
      <div class="bg-white p-3 rounded border border-blue-100">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="font-semibold text-blue-800">{{ $t('virtual.spec.ram') }}</span>
        </div>
        <div class="text-gray-700 text-xs">{{ specs.ram }}</div>
      </div>

      <!-- browser -->
      <div class="bg-white p-3 rounded border border-blue-100">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span class="font-semibold text-blue-800">{{ $t('virtual.spec.browser') }}</span>
        </div>
        <div class="text-gray-700 text-xs">{{ specs.browser }}</div>
      </div>

      <!-- platform -->
      <div class="bg-white p-3 rounded border border-blue-100">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span class="font-semibold text-blue-800">{{ $t('virtual.spec.platform') }}</span>
        </div>
        <div class="text-gray-700 text-xs">{{ specs.platform }}</div>
      </div>
    </div>
  </div>
</template>
