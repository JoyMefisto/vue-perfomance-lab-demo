export {}

declare global {
  interface Window {
    gc?: () => void
  }
}
