import React, { FC, MouseEventHandler, useState } from "react"
import { useComponentStore } from "../store/components"
import { Component, useComponentConfigStore } from "../store/componentConfig"
import { HoverMask } from "./HoverMask"

export const EditorArea: FC = () => {
  const { components } = useComponentStore()
  const { componentConfig } = useComponentConfigStore()
  const [hoverComponentId, setHoverComponentId] = useState<number | null>(null)

  const handleMouseOver: MouseEventHandler = (e) => {
    const target  =(e.target as HTMLElement).closest("[data-component-id]")
    if (target) {
      const id = Number(target.getAttribute("data-component-id"))
      if (id) {
        setHoverComponentId(Number(id))
      }
    }
  }


  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]
      if (!config?.component) {
        return null
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props
        },
        renderComponents(component.children || [])
      )
    })
  }
  
  return (
    <div className="h-[100%] edit-area" onMouseOver={handleMouseOver} onMouseLeave={() => setHoverComponentId(null)}>
      {renderComponents(components)}
      {hoverComponentId && <HoverMask componentId={hoverComponentId} containerClassName="edit-area" />}
    </div>
  )
}
