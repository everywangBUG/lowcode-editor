import { Button as AntButton } from "antd"
import { ButtonType } from "antd/es/button"

export interface ButtonTypeProps {
  type: ButtonType
  text: string
}

export const Button = ({type, text}: ButtonTypeProps) => {
  return <AntButton type={type}>{text}</AntButton>
}