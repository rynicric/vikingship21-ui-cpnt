import React from 'react';
import { MenuProps } from './menu';
import { MenuItemProps } from './menu_item';
import { SubMenuProps } from './menu_sub';
export declare type IMenuComponent = React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>;
    SubMenu: React.FC<SubMenuProps>;
};
declare const MenuComponent: IMenuComponent;
export default MenuComponent;
