<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LocaleSelector from '@/views/components/LocaleSelector.vue'
</script>

<template>
  <div>
    <header class="sticky top-0 z-50 mb-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center py-4 space-x-1">
          <RouterLink to="/" class="nav-link" :class="{ 'nav-link-active': $route.path === '/' }">
            <div class="nav-icon">🏠</div>
          </RouterLink>

          <RouterLink
            to="/computed-method"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/computed-method' }"
          >
            <div class="nav-icon">⚡</div>
            <span class="nav-text">Computed vs Method</span>
          </RouterLink>

          <RouterLink
            to="/debounce-throttle"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/debounce-throttle' }"
          >
            <div class="nav-icon">⏱️</div>
            <span class="nav-text">Debounce and Throttle</span>
          </RouterLink>

          <RouterLink
            to="/rerender"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/rerender' }"
          >
            <div class="nav-icon">📋</div>
            <span class="nav-text">Rerender</span>
          </RouterLink>

          <RouterLink
            to="/virtual"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/virtual' }"
          >
            <div class="nav-icon">🚀</div>
            <span class="nav-text">Virtual Scrolling</span>
          </RouterLink>

          <RouterLink
            to="/lazy"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/lazy' }"
          >
            <div class="nav-icon">🔄</div>
            <span class="nav-text">Lazy Component</span>
          </RouterLink>

          <LocaleSelector />
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid transparent;
  white-space: nowrap;
  min-width: 5rem;
  justify-content: center;
  color: #4b5563;
  margin-right: 0.25rem;
}

.nav-link:hover {
  color: #111827;
  background-color: #f9fafb;
  border-color: #e5e7eb;
}

.nav-link-active {
  background-color: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.nav-link-active:hover {
  background-color: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.nav-icon {
  font-size: 1.125rem;
  transition: transform 0.2s;
}

.nav-link:not(:first-child) .nav-icon {
  margin-right: 0.5rem;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

.nav-text {
  font-weight: 600;
}

/* Smooth scrolling for mobile */
nav {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

nav::-webkit-scrollbar {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-width: 4.375rem;
    flex-direction: column;
  }

  .nav-text {
    display: none;
  }

  .nav-icon {
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}

/* Animation for active state */
.nav-link-active {
  position: relative;
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.25rem;
  height: 0.25rem;
  background: #3b82f6;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1.2);
  }
}

/* Hover effects */
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.nav-link:hover::before {
  left: 100%;
}
</style>
