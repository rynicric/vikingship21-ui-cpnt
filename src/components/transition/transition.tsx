import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationType = (
  'zoom-in-top' | 'zoom-in-bottom' |
  'zoom-in-left' | 'zoom-in-right'
)

export type TransitionProps = CSSTransitionProps & {
  /** Setting the transition animation type */
  animation?: AnimationType
}

/**
 *
 * @param props
 */
export const Transition: React.FC<TransitionProps> = (props) => {
  const { classNames, animation, children, ...resProps } = props
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...resProps}>
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition
