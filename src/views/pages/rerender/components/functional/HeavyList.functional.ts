import { h } from 'vue'

export default (props: { items: string[] }) => {
  return h(
    'ul',
    props.items.map((item) => h('li', { key: item, style: 'padding: 4px 0' }, item)),
  )
}
