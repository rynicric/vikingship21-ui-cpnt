import React from 'react'
import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menu_item'
import SubMenu, { SubMenuProps } from './menu_sub'

export type IMenuComponent = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>,
  SubMenu: React.FC<SubMenuProps>,
}

const MenuComponent = Menu as IMenuComponent
MenuComponent.Item = MenuItem
MenuComponent.SubMenu = SubMenu
export default MenuComponent
