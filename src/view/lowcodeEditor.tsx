import { Allotment } from 'allotment'
import 'allotment/dist/style.css';
import { FC } from 'react'

export const LowcodeEditor: FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
        Header
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          Material
        </Allotment.Pane>
        <Allotment.Pane>
          EditorArea
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          setting
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
