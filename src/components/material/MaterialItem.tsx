import { FC } from "react"
import { useDrag } from "react-dnd"

interface MaterialItemProps {
  name: string
  key: string
}

export const MaterialItem: FC<MaterialItemProps> = (props) => {
  const { name, key } = props

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name
    }
  })

  return (
    <div
      ref={drag}
      key={key}
      className='
        border-dashed
        border-[1px]
        border-[#000]
        py-[8px] px-[10px]
        m-[10px]
        cursor-move
        inline-block
        bg-white
        hover:bg-[#ccc]
      '
    >
      {name}
    </div>
  )
}
