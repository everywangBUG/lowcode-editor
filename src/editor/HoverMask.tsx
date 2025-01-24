import { FC, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { getComponentById } from "../store/components"
import { useComponentStore } from "../store/components"

interface HoverMaskProps {
  containerClassName: string
  componentId: number
}

export const HoverMask: FC<HoverMaskProps> = (props) => {
  const { containerClassName, componentId } = props
  const { components } = useComponentStore()

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0
  })

  useEffect(() => {
    updatePosition()
  }, [componentId])


  const updatePosition = () => {
    if (!componentId) {
      return
    }

    const container = document.querySelector(`.${containerClassName}`) as HTMLElement

    if (!container) {
      return
    }

    const node = document.querySelector(`[data-component-id="${componentId}"]`)
    
    if (!node) {
      return
    }

    const { left, top, width, height } = node.getBoundingClientRect()
    const { left: containerLeft, top: containerTop } = container.getBoundingClientRect()
    
    const labelTop = top - containerTop
    const labelLeft = left - containerLeft + container.scrollLeft

    setPosition({
      left: left - containerLeft + container.scrollTop,
      top: top - containerTop,
      width,
      height,
      labelLeft,
      labelTop
    })
  }

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components)
  }, [componentId])

  const el = useMemo(() => {
    const el = document.createElement("div")
    el.className = "wrapper"

    const container = document.querySelector(`.${containerClassName}`) as HTMLElement
    container?.appendChild(el)
    return el
  }, [])

  return createPortal((
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        border: "1px dashed blue",
        pointerEvents: "none",
        width: position.width,
        height: position.height,
        zIndex: 12,
        borderRadius: 4,
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          display: (!position.width || position.width < 10) ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <div
          style={{
            padding: "0 8px",
            backgroundColor: "blue",
            borderRadius: 4,
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {curComponent?.name}
        </div>
      </div>
    </div>),
  el)
}
