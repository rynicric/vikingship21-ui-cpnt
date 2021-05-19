import React, { CSSProperties } from 'react';
import { ThemeProps } from '../icon/icon';
export interface ProgressProps {
    /** Setting general properties, className */
    className?: string;
    /** Setting general properties, style */
    style?: CSSProperties;
    /** Setting the progress value */
    percent: number;
    /** Setting the progress theme, i.e. color */
    theme?: ThemeProps;
    /** setting the progress whether show value */
    showText?: boolean;
}
/**
 * This is a simple progress bar component that
 * supports the upload component.
 *
 * @param props
 */
export declare const Progress: React.FC<ProgressProps>;
export default Progress;
