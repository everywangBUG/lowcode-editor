import { CommonComponentProps } from "./interface"
import { useMaterialDrop } from "../hook/useMaterialDrop"

export const Container = ({ id, children }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id)

  return (
    <div
      ref={drop}
      className={`min-h-[100px] p-[20px] ${ canDrop ? "border-[2px] border-[blue]" : "border-[1px] border-[#000]"}`}
    >{children}</div>
  )
}
