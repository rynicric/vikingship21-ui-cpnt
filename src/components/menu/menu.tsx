import React, { CSSProperties, useState } from 'react'
import classNames from 'classnames'
import MenuContext, { IMenuContext } from './menu_context'
import { MenuItemProps } from './menu_item'

export type MenuType = 'horizontal' | 'vertical'
export interface MenuProps {
  /** Setting general properties, className */
  className?: string
  /** Setting general properties, style */
  style?: CSSProperties
  /** Setting the menu mode, horizontal or vertical */
  mode?: MenuType
  /** Setting the default active item */
  defaultItem?: string
  /** Setting the default opened sub-menu, only works in vertical mode */
  defaultOpeneds?: string[]
  /** Setting the callback function called when you select one item */
  onSelect?: (index: string) => void
}

/**
 * This is a simple menu component that provides
 * two styles: horizontal or vertical,
 * allowing you to define a secondary menu.
 *
 * @param props
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { className, style, children } = props
  const { mode, defaultItem, defaultOpeneds, onSelect } = props
  const [active, setActive] = useState(defaultItem)
  const classname = classNames(className, 'menu', {
    'menu-vertical': mode === 'vertical',
  })

  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) onSelect(index)
  }

  const renderChildren = () => (
    React.Children.map(children, (child, index) => {
      const element = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = element.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(element, { index: index.toString() })
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        )
      }
    })
  )

  const context: IMenuContext = {
    activeIndex: active ? active : '0',
    handleSelect: handleSelect,
    mode,
    openedIndices: defaultOpeneds,
  }
  return (
    <ul className={classname} style={style} data-testid='test-id'>
      <MenuContext.Provider value={context}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultItem: '0',
  defaultOpeneds: [],
}

export default Menu
