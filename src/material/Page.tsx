import { useDrop } from "react-dnd"
import { useComponentConfigStore } from "../store/componentConfig"
import { useComponentStore } from "../store/components"
import { CommonComponentProps } from "./interface"

function Page({ id, children }: CommonComponentProps) {
  const { componentConfig } = useComponentConfigStore()
  const { addComponent } = useComponentStore()

  const [_, drop] = useDrop({
    accept: ["Button", "Container"],
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

  return (
    <div
      ref={drop}
      className='p-[20px] h-[100%] box-border'
    >
      {children}
    </div>
  )
}

export default Page
