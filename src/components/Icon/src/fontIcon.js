import { defineComponent, h, useAttrs } from 'vue'

export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String
    },
    pointer: {
      type: Boolean
    }
  },
  render() {
    const attrs = useAttrs()

    return h(
      'a',
      {
        title: this.title || '',
        style: this.pointer ? { cursor: 'pointer' } : {},
        ...attrs
      },
      [
        h('i', {
          class: `iconfont ${this.icon}`,
          style: 'font-size:inherit'
        })
      ]
    )
  }
})
