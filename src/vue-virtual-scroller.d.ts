declare module 'vue-virtual-scroller' {
  import { Component, DefineComponent } from 'vue'

  export const RecycleScroller: DefineComponent<{
    items?: any[]
    itemSize?: number
    minItemSize?: number
    sizeField?: string
    typeField?: string
    keyField?: string
    direction?: 'vertical' | 'horizontal'
    pageMode?: boolean
    prerender?: number
    buffer?: number
    emitUpdate?: boolean
    updateInterval?: number
    delayPreviousItems?: boolean
    listTag?: string
    itemTag?: string
    gridItems?: number
    gridGap?: number
  }>

  export const DynamicScroller: DefineComponent<{
    items?: any[]
    minItemSize?: number
    direction?: 'vertical' | 'horizontal'
    pageMode?: boolean
    prerender?: number
    buffer?: number
    emitUpdate?: boolean
    listTag?: string
    itemTag?: string
  }>

  export const DynamicScrollerItem: DefineComponent<{
    item?: any
    active?: boolean
    sizeDependencies?: any[]
    watchData?: boolean
    tag?: string
  }>

  export interface ScrollItem {
    id: string | number
    [key: string]: any
  }

  export interface ScrollEvent {
    startIndex: number
    endIndex: number
    visibleStartIndex: number
    visibleEndIndex: number
  }
}
