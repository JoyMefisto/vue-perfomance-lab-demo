<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface LanguageOption {
  value: 'ru' | 'en' | 'ja'
  name: string
  flag: string
}

type Locale = 'ru' | 'en' | 'ja'

const { locale } = useI18n({ useScope: 'global' })
const selectedLocale = ref<Locale>(locale.value as Locale)
const isOpen = ref<boolean>(false)

const languageOptions: LanguageOption[] = [
  { value: 'ru', name: 'Русский', flag: '🇷🇺' },
  { value: 'en', name: 'English', flag: '🇺🇸' },
]

const getFlag = (lang: Locale): string => {
  const option = languageOptions.find((opt) => opt.value === lang)
  return option ? option.flag : '🌐'
}

const getLanguageName = (lang: Locale): string => {
  const option = languageOptions.find((opt) => opt.value === lang)
  return option ? option.name : 'English'
}

const selectLanguage = (lang: Locale): void => {
  selectedLocale.value = lang
  locale.value = lang
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (!target.closest('.locale-selector')) {
    isOpen.value = false
  }
}

onMounted((): void => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted((): void => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="locale-selector">
    <!-- Current Language Display -->
    <div class="current-locale" @click="isOpen = !isOpen">
      <span class="locale-flag">{{ getFlag(selectedLocale) }}</span>
      <span class="locale-name">{{ getLanguageName(selectedLocale) }}</span>
      <svg
        class="chevron"
        :class="{ 'rotate-180': isOpen }"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown Options -->
    <div v-if="isOpen" class="locale-dropdown">
      <div
        v-for="option in languageOptions"
        :key="option.value"
        class="locale-option"
        :class="{ active: option.value === selectedLocale }"
        @click="selectLanguage(option.value)"
      >
        <span class="locale-flag">{{ option.flag }}</span>
        <span class="locale-name">{{ option.name }}</span>
        <svg
          v-if="option.value === selectedLocale"
          class="checkmark"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    <!-- Backdrop for closing dropdown -->
    <div v-if="isOpen" class="dropdown-backdrop" @click="isOpen = false"></div>
  </div>
</template>

<style scoped>
.locale-selector {
  position: relative;
  display: inline-block;
}

.current-locale {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  font-size: 14px;
  font-weight: 500;
}

.current-locale:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.chevron {
  transition: transform 0.2s ease;
  margin-left: auto;
  opacity: 0.6;
}

.chevron.rotate-180 {
  transform: rotate(180deg);
}

.locale-flag {
  font-size: 16px;
}

.locale-name {
  color: #374151;
}

.locale-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 50;
  margin-top: 4px;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.locale-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
}

.locale-option:last-child {
  border-bottom: none;
}

.locale-option:hover {
  background: #f8fafc;
}

.locale-option.active {
  background: #eff6ff;
  color: #1d4ed8;
}

.locale-option.active .locale-name {
  color: #1d4ed8;
  font-weight: 600;
}

.checkmark {
  margin-left: auto;
  color: #3b82f6;
}

.dropdown-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
}

/* Responsive design */
@media (max-width: 640px) {
  .current-locale {
    min-width: 120px;
    font-size: 13px;
    padding: 6px 10px;
  }

  .locale-option {
    padding: 8px 10px;
    font-size: 13px;
  }
}
</style>
