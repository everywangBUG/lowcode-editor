import { Button as AntButton } from "antd"
import { ButtonType } from "antd/es/button"

export interface ButtonTypeProps {
  type: ButtonType
  text: string
}

export const Button = ({type, id, text}: ButtonTypeProps) => {
  return <AntButton data-component-id={id} type={type}>{text}</AntButton>
}