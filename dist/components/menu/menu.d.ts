import React, { CSSProperties } from 'react';
export declare type MenuType = 'horizontal' | 'vertical';
export interface MenuProps {
    /** Setting general properties, className */
    className?: string;
    /** Setting general properties, style */
    style?: CSSProperties;
    /** Setting the menu mode, horizontal or vertical */
    mode?: MenuType;
    /** Setting the default active item */
    defaultItem?: string;
    /** Setting the default opened sub-menu, only works in vertical mode */
    defaultOpeneds?: string[];
    /** Setting the callback function called when you select one item */
    onSelect?: (index: string) => void;
}
/**
 * This is a simple menu component that provides
 * two styles: horizontal or vertical,
 * allowing you to define a secondary menu.
 *
 * @param props
 */
export declare const Menu: React.FC<MenuProps>;
export default Menu;
