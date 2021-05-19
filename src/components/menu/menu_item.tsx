import React, { CSSProperties, useContext } from 'react'
import classNames from 'classnames'
import MenuContext from './menu_context'

export interface MenuItemProps {
  /** Setting general properties, className */
  className?: string
  /** Setting general properties, style */
  style?: CSSProperties
  /** Setting the item index */
  index?: string
  /** Setting the item disabled  */
  disabled?: boolean
}

/**
 * This is the part of the menu component, item.
 *
 * @param props
 */
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, style, index, disabled, children } = props
  const context = useContext(MenuContext)
  const classname = classNames(className, 'menu-item', {
    'disabled': disabled,
    'active': index === context.activeIndex,
  })

  const handleClick = () => {
    if (context.handleSelect && !disabled && typeof index === 'string') {
      context.handleSelect(index)
    }
  }

  return (
    <li className={classname} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
