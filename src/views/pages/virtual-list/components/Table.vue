<template>
  <div class="technical-comparison mt-8">
    <h3 class="text-lg font-semibold mb-4">{{ $t('virtual.indicators.title') }}</h3>

    <!-- Desktop Table -->
    <div class="hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="px-4 py-3 text-left font-semibold text-gray-900 w-1/3">
              {{ $t('virtual.indicators.table.col.one') }}
            </th>
            <th class="px-4 py-3 text-center font-semibold text-red-600 w-1/3">
              {{ $t('virtual.indicators.table.col.two') }}
            </th>
            <th class="px-4 py-3 text-center font-semibold text-green-600 w-1/3">
              {{ $t('virtual.indicators.table.col.three') }}
            </th>
            <th class="px-4 py-3 text-center font-semibold text-blue-600 w-1/4">
              {{ $t('virtual.indicators.table.col.four') }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ $t('virtual.indicators.table.row.one') }}
            </td>
            <td class="px-4 py-3 text-center text-red-600 font-medium">200-1000ms</td>
            <td class="px-4 py-3 text-center text-green-600 font-medium">10-30ms</td>
            <td class="px-4 py-3 text-center text-blue-600 font-bold">20-200x</td>
          </tr>
          <tr class="hover:bg-gray-50 transition-colors bg-gray-50/50">
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ $t('virtual.indicators.table.row.two') }}
            </td>
            <td class="px-4 py-3 text-center text-red-600 font-medium">80-180 FPS</td>
            <td class="px-4 py-3 text-center text-green-600 font-medium">175-180 FPS</td>
            <td class="px-4 py-3 text-center text-blue-600 font-bold">2x</td>
          </tr>
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ $t('virtual.indicators.table.row.three') }}
            </td>
            <td class="px-4 py-3 text-center text-red-600 font-medium">130-200MB</td>
            <td class="px-4 py-3 text-center text-green-600 font-medium">110-200MB</td>
            <td class="px-4 py-3 text-center text-blue-600 font-bold">~</td>
          </tr>
          <tr class="hover:bg-gray-50 transition-colors bg-gray-50/50">
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ $t('virtual.indicators.table.row.four') }}
            </td>
            <td class="px-4 py-3 text-center text-red-600 font-medium">10,000</td>
            <td class="px-4 py-3 text-center text-green-600 font-medium">10-30</td>
            <td class="px-4 py-3 text-center text-blue-600 font-bold">1000x</td>
          </tr>
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ $t('virtual.indicators.table.row.five') }}
            </td>
            <td class="px-4 py-3 text-center text-red-600 font-medium">50,000+</td>
            <td class="px-4 py-3 text-center text-green-600 font-medium">280-400</td>
            <td class="px-4 py-3 text-center text-blue-600 font-bold">178x</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Legend -->
    <div class="mt-4 flex flex-wrap gap-4 justify-center text-xs">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-red-500 rounded"></div>
        <span class="text-gray-600">{{ $t('virtual.indicators.table.one') }} </span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-green-500 rounded"></div>
        <span class="text-gray-600">{{ $t('virtual.indicators.table.two') }} </span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded"></div>
        <span class="text-gray-600"> {{ $t('virtual.indicators.table.three') }} </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.technical-comparison {
  max-width: 100%;
}

/* Smooth hover effects */
table tbody tr {
  transition: all 0.2s ease-in-out;
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .technical-comparison {
    font-size: 14px;
  }
}
</style>
