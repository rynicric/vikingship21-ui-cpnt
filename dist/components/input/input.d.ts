import React, { ReactElement } from 'react';
import { InputHTMLAttributes as InputAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm' | 'default';
export interface InputProps extends Omit<InputAttributes<HTMLElement>, 'size'> {
    /** Setting the input size */
    size?: InputSize;
    /** Setting the input disabled */
    disabled?: boolean;
    /** Adding an icon floating on the right to remind */
    icon?: IconProp;
    /** Adding a prefix to configure some fixed combinations */
    prepend?: string | ReactElement;
    /** Adding a suffix to configure some fixed combinations */
    append?: string | ReactElement;
}
/**
 * This is a simple input component that allows you
 * to add icon, prefixe and suffixe.
 *
 * @param props
 */
export declare const Input: React.FC<InputProps>;
export default Input;
