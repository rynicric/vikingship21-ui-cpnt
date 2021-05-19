import React from 'react';
import { MenuItemProps } from './menu_item';
export interface SubMenuProps extends MenuItemProps {
    /** setting the sub-menu title */
    title?: string;
}
/**
 * This is the part of the menu component, sub-menu.
 *
 * @param props
 */
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
