import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = (
  'primary' | 'secondary' |
  'success' | 'info' | 'warning' | 'danger' |
  'light' | 'dark'
)

export interface IconProps extends FontAwesomeIconProps {
  /** Setting the icon theme, i.e. color */
  theme?: ThemeProps
}

/**
 * This is a simple Icon component encapsulation,
 * from FontAwesomeIcon.
 *
 * @param props
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...resProps } = props
  const classname = classNames(className, 'icn', { [`icn-${theme}`]: theme })
  return <FontAwesomeIcon className={classname} {...resProps} />
}

Icon.defaultProps = {
  theme: 'dark',
}

export default Icon
