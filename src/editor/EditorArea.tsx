import React, { FC } from "react"
import { useComponentStore } from "../store/components"
import { Component, useComponentConfigStore } from "../store/componentConfig"

export const EditorArea: FC = () => {
  const { components } = useComponentStore()
  const { componentConfig } = useComponentConfigStore()

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
    <div className="h-[100%]">{renderComponents(components)}</div>
  )
}
