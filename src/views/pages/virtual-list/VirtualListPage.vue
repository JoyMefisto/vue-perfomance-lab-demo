<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import RegularList from './components/NotOptimized.vue'
import VirtualList from './components/Optimized.vue'
import System from './components/System.vue'
import Table from './components/Table.vue'

const activeTab = ref<'regular' | 'virtual'>('regular')
const totalItems = 10000
const lastRenderTime = ref(0)

const metrics = reactive({
  renderTime: 0,
  fps: 0,
  listDomNodes: 0,
  totalDomNodes: 0,
  memory: 0,
  visibleItems: 0,
})

// Define component based on active tab
const currentComponent = computed(() => {
  return activeTab.value === 'regular' ? RegularList : VirtualList
})

// Initialize from URL parameters
const initializeFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const tab = urlParams.get('tab')

  if (tab === 'virtual' || tab === 'regular') {
    activeTab.value = tab
  } else {
    // Default - regular list
    activeTab.value = 'regular'
    // Update URL without page reload
    updateURL('regular')
  }
}

// Update URL when switching tabs
const updateURL = (tab: string) => {
  const newUrl = new URL(window.location.href)
  newUrl.searchParams.set('tab', tab)
  window.history.replaceState({}, '', newUrl.toString())
}

const switchTab = (tab: 'regular' | 'virtual') => {
  activeTab.value = tab
  updateURL(tab)

  // Save last render time
  if (metrics.renderTime > 0) {
    lastRenderTime.value = metrics.renderTime
  }

  // Reset current metrics (except last render time)
  Object.assign(metrics, {
    renderTime: 0,
    fps: 0,
    listDomNodes: 0,
    totalDomNodes: 0,
    memory: 0,
    visibleItems: 0,
  })
}

const updateMetrics = (newMetrics: typeof metrics) => {
  Object.assign(metrics, newMetrics)

  // Update last render time if new value exists
  if (newMetrics.renderTime > 0) {
    lastRenderTime.value = newMetrics.renderTime
  }
}

onMounted(() => {
  initializeFromURL()
})

onUnmounted(() => {
  Object.assign(metrics, {
    renderTime: 0,
    fps: 0,
    listDomNodes: 0,
    totalDomNodes: 0,
    memory: 0,
    visibleItems: 0,
  })
})
</script>

<template>
  <div class="performance-demo">
    <h1 class="text-2xl font-bold mb-6">{{ $t('virtual.title') }}</h1>

    <p class="text-lg font-bold mb-6 text-700 mt-6">{{ $t('virtual.description') }}</p>

    <h2 class="text-lg font-bold text-700 mt-6">{{ $t('virtual.ex1.title') }}</h2>
    <p class="text-lg font-bold mb-6 text-700">{{ $t('virtual.ex1.description') }}</p>

    <h2 class="text-lg font-bold text-700 mt-6">
      {{ $t('virtual.ex2.title') }}
    </h2>
    <p class="text-lg font-bold mb-6 text-700">
      {{ $t('virtual.ex2.description') }}
      <a href="https://github.com/Akryum/vue-virtual-scroller" target="_blank">
        vue-virtual-scroller
      </a>
    </p>

    <div class="tabs mb-6">
      <button
        @click="switchTab('regular')"
        :class="['tab-btn', { active: activeTab === 'regular' }]"
      >
        📋 Regular List (Not Optimized)
      </button>
      <button
        @click="switchTab('virtual')"
        :class="['tab-btn', { active: activeTab === 'virtual' }]"
      >
        🚀 Virtual List (Optimized)
      </button>
    </div>

    <div class="metrics mb-4 p-4 bg-gray-100 rounded">
      <h3 class="font-semibold mb-2">Performance Metrics:</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <strong>Render Time:</strong> {{ metrics.renderTime }}ms
          <span v-if="lastRenderTime > 0" class="text-xs text-gray-500 ml-2">
            (Last: {{ lastRenderTime }}ms)
          </span>
        </div>
        <div><strong>FPS:</strong> {{ metrics.fps }}</div>
        <div><strong>Visible Items:</strong> {{ metrics.visibleItems }}/{{ totalItems }}</div>
        <div><strong>List DOM Nodes:</strong> {{ metrics.listDomNodes }}</div>
        <div><strong>Total DOM Nodes:</strong> {{ metrics.totalDomNodes }}</div>
        <div><strong>Memory Usage:</strong> {{ metrics.memory }} MB</div>
      </div>
    </div>

    <div class="demo-area">
      <component :is="currentComponent" @metrics-updated="updateMetrics" />
    </div>

    <hr class="my-8" />
    <System />
    <Table />
  </div>
</template>

<style scoped>
.performance-demo {
  margin: 0 auto;
  padding-bottom: 20px;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
  background-color: #f9fafb;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.tab-btn {
  flex: 1;
  padding: 16px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-size: 14px;
}

.tab-btn:hover {
  color: #374151;
  background-color: #f3f4f6;
}

.tab-btn.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  background-color: white;
}

.metrics {
  border-left: 4px solid #3b82f6;
  background-color: white;
}

.demo-area {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}
</style>
