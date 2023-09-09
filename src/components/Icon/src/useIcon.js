import { IconFont } from '..'

export default function useIcon(icon, attrs) {
  return defineComponent({
    name: 'IconFont',
    render() {
      return h(IconFont, {
        icon,
        ...attrs
      })
    }
  })
}
