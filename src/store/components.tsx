import { create } from "zustand"

interface Component {
  id: number
  name: string
  props: unknown
  children?: Component[]
  parentId?: number
}

interface State {
  components: Component[]
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void
  deleteComponent: (componentId: number) => void
  updateComponent: (componentId: number, props: any) => void
}

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null

  for (const component of components) {
    if (component.id === id) return component
    if (component.children && component.children.length > 0) {
      const res = getComponentById(id, component.children)
      if (res !== null) return res
    }
  }
  return null
}

export const useComponentStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: 1,
      name: "div",
      props: {},
      children: [],
      parentId: 1
    }
  ],
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components)
        
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component)
          } else {
            parentComponent.children = [component]
          }
        }
      }
      component.parentId = parentId
      return { components: [...state.components] }
    }),
  deleteComponent: (componentId) => {
    if (!componentId) return

    const component = getComponentById(componentId, get().components)
    if (component?.parentId) {
      const parentComponent = getComponentById(component.parentId, get().components)

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(item => item.id !== +componentId)
      }

      set({components: [...get().components]})
    }
  },
  updateComponent: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.props = {...component.props, ...props}

        return {components: [...state.components]}
      }
      return {components: [...state.components]}
    })
}))