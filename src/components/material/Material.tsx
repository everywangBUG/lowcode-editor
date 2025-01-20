import { FC, useMemo } from "react"
import { useComponentConfigStore } from "../../store/componentConfig"
import { MaterialItem } from "./MaterialItem"

export const Material: FC = () => {
  const { componentConfig } = useComponentConfigStore()

  const components = useMemo(() => {
    return Object.values(componentConfig)
  }, [componentConfig])

  return (
    <div>
      {
        components.map((component, index) => {
          return <MaterialItem key={`${component.name}_${index}`} name={component.name}/>
        })
      }
    </div>
  )
}
