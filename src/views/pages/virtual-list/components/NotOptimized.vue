<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  metricsUpdated: [
    metrics: {
      renderTime: number
      fps: number
      listDomNodes: number
      totalDomNodes: number
      memory: number
      visibleItems: number
    },
  ]
}>()

const listContainer = ref<HTMLElement>()
const visibleItems = ref<Array<any>>([])
const frameCount = ref(0)
const lastTime = ref(performance.now())
const fps = ref(0)
const totalItems = 10000
const renderStartTime = ref(0)
const memoryCleanupInterval = ref<NodeJS.Timeout>()

// Generate data with time measurement
const generateItems = () => {
  renderStartTime.value = performance.now()

  console.time('Generate regular list items')

  // Create data
  visibleItems.value = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: 'This is item description with some text content. '.repeat(5),
    price: Math.random() * 100,
    category: `Category ${Math.floor(Math.random() * 10)}`,
    inStock: Math.random() > 0.5,
  }))

  // Wait for next Vue tick for render and then measure time
  setTimeout(() => {
    const renderTime = performance.now() - renderStartTime.value
    console.timeEnd('Generate regular list items')
    console.log(`Regular list render time: ${renderTime}ms`)
    updateMetrics(renderTime)
  }, 0)
}

const countListNodes = (): number => {
  const container = listContainer.value
  if (!container) return 0
  return container.querySelectorAll('.list-item').length
}

const measureFPS = () => {
  frameCount.value++
  const currentTime = performance.now()

  if (currentTime - lastTime.value >= 1000) {
    fps.value = Math.round((frameCount.value * 1000) / (currentTime - lastTime.value))
    frameCount.value = 0
    lastTime.value = currentTime
    updateMetrics(0)
  }

  requestAnimationFrame(measureFPS)
}

// Memory cleanup function
const cleanupMemory = () => {
  // Force garbage collection if available
  if (window.gc) {
    window.gc()
  }

  // Clear large arrays if not needed
  if (visibleItems.value.length > 0 && !document.contains(listContainer.value)) {
    visibleItems.value = []
  }
}

const handleScroll = () => {
  updateMetrics(0)
}

const updateMetrics = (renderTime: number) => {
  const listDomNodes = countListNodes()
  const totalDomNodes = document.getElementsByTagName('*').length
  const memory = (performance as any).memory
    ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
    : 0

  emit('metricsUpdated', {
    renderTime: Math.round(renderTime),
    fps: fps.value,
    listDomNodes,
    totalDomNodes,
    memory,
    visibleItems: totalItems,
  })
}

onMounted(() => {
  console.log('Mounting regular list...')
  generateItems()
  measureFPS()

  const interval = setInterval(() => {
    updateMetrics(0)
  }, 500)

  // Periodic memory cleanup
  memoryCleanupInterval.value = setInterval(cleanupMemory, 2000)

  onUnmounted(() => {
    clearInterval(interval)
    if (memoryCleanupInterval.value) {
      clearInterval(memoryCleanupInterval.value)
    }
    // Clean up data when unmounting
    visibleItems.value = []
  })
})
</script>

<template>
  <div class="regular-list">
    <div class="list-header p-4 bg-gray-50 border-b">
      <h2 class="text-lg font-semibold">Regular List ({{ totalItems }} items)</h2>
      <p class="text-sm text-gray-600 mt-1">
        ⚠️ Rendering ALL {{ totalItems }} items at once - expect lag!
      </p>
    </div>

    <div ref="listContainer" class="list-container" @scroll="handleScroll">
      <div v-for="item in visibleItems" :key="item.id" class="list-item" :data-item-id="item.id">
        <div class="item-content">
          <span class="item-id">#{{ item.id }}</span>
          <span class="item-text">{{ item.name }}</span>
          <span class="item-data">{{ item.description.substring(0, 30) }}...</span>
        </div>
      </div>
    </div>

    <div class="list-footer p-3 bg-red-50 border-t text-xs text-red-700">
      ❌ All {{ totalItems }} items rendered in DOM - Performance will suffer!
    </div>
  </div>
</template>

<style scoped>
.regular-list {
  height: 600px;
  display: flex;
  flex-direction: column;
}

.list-header {
  flex-shrink: 0;
}

.list-container {
  flex: 1;
  overflow-y: auto;
  height: 500px;
  background-color: white;
}

.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  background-color: #fef2f2;
}

.list-item:hover {
  background-color: #fee2e2;
}

.list-item:nth-child(even) {
  background-color: #f8fafc;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-id {
  font-weight: 700;
  color: #dc2626;
  min-width: 70px;
}

.item-text {
  font-weight: 600;
  min-width: 100px;
}

.item-data {
  color: #6b7280;
  font-size: 12px;
  flex: 1;
}
</style>
