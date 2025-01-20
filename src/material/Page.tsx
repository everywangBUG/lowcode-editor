import { PropsWithChildren } from "react"
import { useDrop } from "react-dnd"
import { ComponentConfig, useComponentConfigStore } from "../store/componentConfig"
import { useComponentStore } from "../store/components"

function Page({ children }: PropsWithChildren) {
  const { componentConfig } = useComponentConfigStore()
  const { components, addComponent } = useComponentStore()

  const [{ canDrop }, drop] = useDrop({
    accept: ["Button", "Container"],
    drop: (item: { type: string }) => {
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
