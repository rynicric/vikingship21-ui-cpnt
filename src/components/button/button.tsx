import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonType = 'primary' | 'default' | 'link'
type ButtonSize = 'lg' | 'sm' | 'default'

interface BaseButtonProps {
  /** Setting the button type */
  btype?: ButtonType
  /** Setting the button size */
  size?: ButtonSize
  /** Setting the button disabled */
  disabled?: boolean
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


/**
 * This is a simple button component, which includes
 * native button and anchor style.
 *
 * @param props
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { className, btype, size, disabled, children, ...resProps } = props
  const classname = classNames(className, 'btn', {
    [`btn-${btype}`]: btype && btype !== 'default',
    [`btn-${size}`]: size && size !== 'default',
    'disabled': disabled && btype === 'link',
  })

  if (btype === 'link') {
    return (
      <a
        className={classname}
        {...resProps}>
        {children}
      </a>
    )
  }

  return (
    <button
      className={classname}
      disabled={disabled}
      {...resProps}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  btype: 'default',
  size: 'default',
  disabled: false,
}

export default Button
