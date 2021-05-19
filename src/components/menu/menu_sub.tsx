import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import Icon from '../icon'
import Transition from '../transition'
import MenuContext from './menu_context'
import { MenuItemProps } from './menu_item'

export interface SubMenuProps extends MenuItemProps {
  /** setting the sub-menu title */
  title?: string
}

/**
 * This is the part of the menu component, sub-menu.
 *
 * @param props
 */
const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { className, title, style, index, disabled, children } = props
  const context = useContext(MenuContext)
  const isOpen = (index && context.mode === 'vertical' ?
    (context.openedIndices as Array<string>).includes(index) : false)
  const [opened, setOpen] = useState(isOpen)
  const classname = classNames(className, 'menu-item menu-sub', {
    'disabled': disabled,
    'opened': opened,
    'active': (index === context.activeIndex ||
      context.activeIndex.startsWith(index as string)),
  })

  const handelOpen = (function () {
    let timer: any
    return (e: React.MouseEvent, toggle?: boolean) => {
      clearTimeout(timer)
      e.preventDefault()
      timer = setTimeout(() => setOpen(toggle == null ? !opened : toggle), 100)
    }
  })()
  const clickEvents = context.mode === 'vertical' ? { onClick: handelOpen } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handelOpen(e, true),
    onMouseLeave: (e: React.MouseEvent) => handelOpen(e, false),
  } : {}

  const renderChildren = () => (
    React.Children.map(children, (child, idx) => {
      const element = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = element.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(element, { index: `${index}-${idx}` })
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component'
        )
      }
    })
  )

  return (
    <li className={classname} style={style} {...hoverEvents}>
      <span className='menu-sub-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' />
      </span>
      <Transition in={opened} timeout={300} animation={'zoom-in-top'}>
        <ul className='menu-sub-list'>{renderChildren()}</ul>
      </Transition>
    </li >
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
