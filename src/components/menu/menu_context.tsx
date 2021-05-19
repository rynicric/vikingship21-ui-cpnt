import { createContext } from 'react'
import { MenuType } from './menu'

export interface IMenuContext {
  // for item
  activeIndex: string
  handleSelect?: (index: string) => void
  // for submenu
  mode?: MenuType
  openedIndices?: string[]
}

const MenuContext = createContext<IMenuContext>({ activeIndex: '0' })
export default MenuContext
