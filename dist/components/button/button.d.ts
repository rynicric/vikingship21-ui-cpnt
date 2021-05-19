import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
declare type ButtonType = 'primary' | 'default' | 'link';
declare type ButtonSize = 'lg' | 'sm' | 'default';
interface BaseButtonProps {
    /** Setting the button type */
    btype?: ButtonType;
    /** Setting the button size */
    size?: ButtonSize;
    /** Setting the button disabled */
    disabled?: boolean;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * This is a simple button component, which includes
 * native button and anchor style.
 *
 * @param props
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
