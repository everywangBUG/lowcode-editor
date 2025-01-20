import { create } from "zustand"
import { Container } from "../material/Container"
import { Button } from "../material/Button"
import Page from "../material/Page"

export interface ComponentConfig {
  name: string
  defaultProps: Record<string, any>
  component: any
}

export interface Component {
  id: number
  name: string
  props: Record<string, any>
  children: Component[]
  parentId?: number
}

interface State {
  componentConfig: {[key: string]: ComponentConfig}
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export const useComponentConfigStore = create<State& Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮"
      },
      component: Button
    },
    Page: {
      name: "page",
      defaultProps: {},
      component: Page
    }
  },
  registerComponent: (name, componentConfig) => set((state) => {
    return {
      ...state,
      componentConfig: {
        ...state.componentConfig,
        [name]: componentConfig
      }
    }
  })
}))