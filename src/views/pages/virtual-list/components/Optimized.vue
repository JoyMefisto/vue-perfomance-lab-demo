<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

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

const scroller = ref<InstanceType<typeof RecycleScroller>>()
const allItems = ref<Array<any>>([])
const currentVisibleItems = ref(0)
const frameCount = ref(0)
const lastTime = ref(performance.now())
const fps = ref(0)
const totalItems = 10000
const renderStartTime = ref(0)
const memoryCleanupInterval = ref<NodeJS.Timeout>()

// Generate data with time measurement
const generateItems = () => {
  renderStartTime.value = performance.now()

  console.time('Generate virtual list items')

  // THE SAME data as in regular list
  allItems.value = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: 'This is item description with some text content. '.repeat(5),
    price: Math.random() * 100,
    category: `Category ${Math.floor(Math.random() * 10)}`,
    inStock: Math.random() > 0.5,
  }))

  // Wait for render and then measure time
  nextTick(() => {
    const renderTime = performance.now() - renderStartTime.value
    console.timeEnd('Generate virtual list items')
    console.log(`Virtual list render time: ${renderTime}ms`)
    updateMetrics(renderTime)
  })
}

const countListNodes = (): number => {
  const scrollerEl = document.querySelector('.scroller')
  if (!scrollerEl) return 0
  const items = scrollerEl.querySelectorAll('.vue-recycle-scroller__item-view')
  return items.length
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
  if (window.gc) {
    window.gc()
  }
}

const onResize = () => {
  updateVisibleCount()
  updateMetrics(0)
}

const onVisible = () => {
  updateVisibleCount()
  updateMetrics(0)
}

const updateVisibleCount = () => {
  const count = countListNodes()
  currentVisibleItems.value = count
}

const updateMetrics = (renderTime: number) => {
  try {
    const listDomNodes = countListNodes()
    const totalDomNodes = document.getElementsByTagName('*').length
    const memory = (performance as any).memory
      ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
      : 0

    currentVisibleItems.value = listDomNodes

    emit('metricsUpdated', {
      renderTime: Math.round(renderTime),
      fps: fps.value,
      listDomNodes,
      totalDomNodes,
      memory,
      visibleItems: listDomNodes,
    })
  } catch (error) {
    console.warn('Error updating metrics:', error)
  }
}

onMounted(() => {
  console.log('Mounting virtual list...')
  generateItems()
  measureFPS()

  setTimeout(() => {
    updateVisibleCount()
    updateMetrics(0)
  }, 100)

  const interval = setInterval(() => {
    updateMetrics(0)
  }, 500)

  memoryCleanupInterval.value = setInterval(cleanupMemory, 2000)

  onUnmounted(() => {
    clearInterval(interval)
    if (memoryCleanupInterval.value) {
      clearInterval(memoryCleanupInterval.value)
    }
    allItems.value = []
  })
})
</script>
<template>
  <div class="virtual-list">
    <div class="list-header p-4 bg-gray-50 border-b">
      <h2 class="text-lg font-semibold">Virtual List ({{ totalItems }} items)</h2>
      <p class="text-sm text-gray-600 mt-1">
        ✅ Only rendering visible items - smooth performance!
      </p>
    </div>

    <RecycleScroller
      ref="scroller"
      :items="allItems"
      :item-size="64"
      key-field="id"
      class="scroller"
      @resize="onResize"
      @visible="onVisible"
    >
      <template #default="{ item }">
        <div class="virtual-item">
          <div class="item-content">
            <span class="item-id">#{{ item.id }}</span>
            <span class="item-text">{{ item.name }}</span>
            <span class="item-data">{{ item.description.substring(0, 30) }}...</span>
          </div>
        </div>
      </template>
    </RecycleScroller>

    <div class="list-footer p-3 bg-green-50 border-t text-xs text-green-700">
      <div class="flex justify-between items-center">
        <span>Only {{ currentVisibleItems }} of {{ totalItems }} items rendered</span>
        <span class="font-semibold">✅ Virtual scrolling active</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-list {
  height: 600px;
  display: flex;
  flex-direction: column;
}

.list-header {
  flex-shrink: 0;
}

.scroller {
  flex: 1;
  height: 500px;
}

.virtual-item {
  height: 64px;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  background-color: #f0fdf4;
}

.virtual-item:hover {
  background-color: #dcfce7;
}

.virtual-item:nth-child(even) {
  background-color: #f8fafc;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
}

.item-id {
  font-weight: 700;
  color: #059669;
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
