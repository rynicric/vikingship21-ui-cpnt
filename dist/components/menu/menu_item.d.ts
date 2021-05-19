import React, { CSSProperties } from 'react';
export interface MenuItemProps {
    /** Setting general properties, className */
    className?: string;
    /** Setting general properties, style */
    style?: CSSProperties;
    /** Setting the item index */
    index?: string;
    /** Setting the item disabled  */
    disabled?: boolean;
}
/**
 * This is the part of the menu component, item.
 *
 * @param props
 */
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
