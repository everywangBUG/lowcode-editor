import { FC, useEffect } from "react"
import { useComponentStore } from "../store/components"

export const EditorArea: FC = () => {
  const { components, addComponent, deleteComponent, updateComponent } = useComponentStore()

  useEffect(() => {
    addComponent({
      id: 2,
      name: "Container",
      props: {},
      children: []
    }, 1)

    addComponent({
      id: 3,
      name: "Container",
      props: {},
      children: []
    }, 2)
    

    setTimeout(() => {
      deleteComponent(3)
    }, 2000)


    updateComponent(2, {
      title: "Test"
    })
  }, [])
  
  return (
    <pre>{JSON.stringify(components, null, 2)}</pre>
  )
}
