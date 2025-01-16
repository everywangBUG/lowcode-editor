import React, { FC, useEffect } from "react"
import { useComponentStore } from "../store/components"
import { Component, useComponentConfigStore } from "../store/componentConfig"

export const EditorArea: FC = () => {
  const { components, addComponent } = useComponentStore()
  const { componentConfig } = useComponentConfigStore()

  useEffect(() => {
    addComponent({
      id: 2,
      name: "Container",
      props: {},
      children: []
    }, 1)

    addComponent({
      id: 3,
      name: "Button",
      props: {
        text: "确认"
      },
      children: []
    }, 2)

  }, [])

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
          ...config.defaultProps,
          ...component.props
        },
        renderComponents(component.children || [])
      )
    })
  }
  
  return (
    <div className="h-[100%]">{JSON.stringify(renderComponents(components))}{renderComponents(components)}</div>
  )
}
