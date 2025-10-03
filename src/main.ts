import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en: en,
    ru: ru,
  },
})

const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
