import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationType = ('zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right');
export declare type TransitionProps = CSSTransitionProps & {
    /** Setting the transition animation type */
    animation?: AnimationType;
};
/**
 *
 * @param props
 */
export declare const Transition: React.FC<TransitionProps>;
export default Transition;
