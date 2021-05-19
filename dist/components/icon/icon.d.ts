import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = ('primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark');
export interface IconProps extends FontAwesomeIconProps {
    /** Setting the icon theme, i.e. color */
    theme?: ThemeProps;
}
/**
 * This is a simple Icon component encapsulation,
 * from FontAwesomeIcon.
 *
 * @param props
 */
export declare const Icon: React.FC<IconProps>;
export default Icon;
