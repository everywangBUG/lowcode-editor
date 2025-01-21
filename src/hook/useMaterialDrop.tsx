import { useDrop } from "react-dnd"
import { useComponentStore } from "../store/components"
import { useComponentConfigStore } from "../store/componentConfig"

export function useMaterialDrop(accept: string[], id: number) {
  const { componentConfig } = useComponentConfigStore()
  const { addComponent } = useComponentStore()
  
  const [{ canDrop },  drop] = useDrop({
    accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      const props = componentConfig[item.type].defaultProps
      addComponent({
        id: new Date().getTime(),
        name: item.type,
        props
      }, id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return {
    canDrop,
    drop
  }
}