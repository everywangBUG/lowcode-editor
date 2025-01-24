import { CommonComponentProps } from "./interface"
import { useMaterialDrop } from "../hook/useMaterialDrop"

function Page({ id, children }: CommonComponentProps) {

  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id)

  return (
    <div
      ref={drop}
      data-component-id={id}
      className='p-[20px] h-[100%] box-border'
      style={{ border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  )
}

export default Page
