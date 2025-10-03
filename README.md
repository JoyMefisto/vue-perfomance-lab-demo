# ⚡ Vue Performance Lab Demo

Demonstration project showcasing **Vue 3 performance optimizations** with interactive examples.  
The project was created for educational purposes to demonstrate frontend engineering skills, code organization, and optimization practices.

🚀 Live demo: 🔗[vue-performance-lab-demo.vercel.app](https://vue-performance-lab-demo.vercel.app/)

🌍 **Localization:** 🇷🇺 Russian + 🇬🇧 English

---

## 🎯 Project Goals

This project highlights the topic of **Vue 3 optimizations**, where I demonstrate:

- Understanding of **Vue 3 internals** and performance bottlenecks.
- Approaches to **optimize rendering, computations, and bundle size**.
- **Interactive examples**: run tests manually, tweak parameters, and compare execution times.
- Ability to explain optimizations in simple terms — a key skill for a **Lead / Senior Frontend Engineer**.

---

## 🔬 Implemented Optimizations

The project includes **5 interactive scenarios**:

1. **Using `computed` instead of `methods/watch`**
   - Problem: heavy computations are recalculated on every render.
   - Solution: memoization (caching computations) via `computed`.

2. **Debounce / Throttle for inputs and events**
   - Problem: queries or filters run on every keystroke.
   - Solution: lodash `debounce` and `throttle`.

3. **Component rerender optimization**
   - Problem: the entire tree rerenders on every small change.
   - Solution: `v-memo`, `shallowRef`, splitting into smaller components.

4. **Virtual scrolling**
   - Problem: a list with 10,000 elements lags.
   - Solution: `vue-virtual-scroller` — render only the visible part.

5. **Lazy loading components (dynamic import)**
   - Problem: large bundle and slow first render.
   - Solution: `defineAsyncComponent` / `Suspense`.

---

## 🛠️ Tech Stack

- **Vue 3 (Composition API, TypeScript)**
- **Vite** — fast build tool
- **Vue Router** — routing between examples
- **TailwindCSS** — styling
- **vue-virtual-scroller** — list virtualization
- **Lodash** — debounce and throttle
- **i18n** — language switching (RU / EN)
- **Vercel** — deployment

---

## 📋 Prerequisites

- Node.js **>=18**
- npm, pnpm, or yarn (your choice)

---

## 💻 Run Locally

Clone the repository:

```bash
git clone https://github.com/JoyMefisto/vue-performance-lab-demo.git
cd vue-performance-lab-demo
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

📂 Project Structure

```bash
├── README.md
├── env.d.ts
├── eslint.config.ts
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── locales
│   │   ├── en.json
│   │   └── ru.json
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   └── views
│       ├── components
│       │   └── LocaleSelector.vue
│       └── pages
│           ├── computed-method
│           │   ├── ComputedMethodPage.vue
│           │   └── components
│           │       ├── fibNotOptimized.vue
│           │       ├── fibOptimized.vue
│           │       ├── filterNotOptimized.vue
│           │       └── filterOptimized.vue
│           ├── debounce-throttle
│           │   ├── DebounceThrottlePage.vue
│           │   └── components
│           │       ├── Debounce.vue
│           │       └── Throttle.vue
│           ├── lazy-load
│           │   ├── LazyLoadPage.vue
│           │   └── components
│           │       ├── Basic.vue
│           │       ├── Hello.vue
│           │       ├── Profile.vue
│           │       ├── Suspense.vue
│           │       └── Timeout.vue
│           ├── main
│           │   └── MainPage.vue
│           ├── rerender
│           │   ├── RerenderPage.vue
│           │   └── components
│           │       ├── NotOptimized.vue
│           │       ├── functional
│           │       │   ├── HeavyList.functional.ts
│           │       │   └── Optimized.vue
│           │       ├── memo
│           │       │   ├── HeavyList.vue
│           │       │   └── Optimized.vue
│           │       └── shallowRef
│           │           ├── HeavyList.vue
│           │           └── Optimized.vue
│           └── virtual-list
│               ├── VirtualListPage.vue
│               └── components
│                   ├── NotOptimized.vue
│                   ├── Optimized.vue
│                   ├── System.vue
│                   └── Table.vue
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📄 License

MIT © 2025 – Project created for educational purposes.

---

💬 Got improvement ideas? Create an issue or pull request.
⭐ If this project was useful — leave a star on GitHub!
