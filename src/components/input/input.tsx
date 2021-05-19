import React, { ReactElement } from 'react'
import { InputHTMLAttributes as InputAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../icon'

type InputSize = 'lg' | 'sm' | 'default'

export interface InputProps extends Omit<InputAttributes<HTMLElement>, 'size'> {
  /** Setting the input size */
  size?: InputSize
  /** Setting the input disabled */
  disabled?: boolean
  /** Adding an icon floating on the right to remind */
  icon?: IconProp
  /** Adding a prefix to configure some fixed combinations */
  prepend?: string | ReactElement
  /** Adding a suffix to configure some fixed combinations */
  append?: string | ReactElement
}

/**
 * This is a simple input component that allows you
 * to add icon, prefixe and suffixe.
 *
 * @param props
 */
export const Input: React.FC<InputProps> = (props) => {
  const {
    className, size, disabled, icon,
    prepend, append, style, ...resProps
  } = props

  const classname = classNames(className, 'ipt', {
    [`ipt-${size}`]: size && size !== 'default',
    'ipt-addon-prepend': prepend,
    'ipt-addon-append': append,
    'disabled': disabled,
  })

  // fixing controlled value
  if ('value' in props) {
    delete resProps.defaultValue
    resProps.value = props.value == null ? '' : props.value
  }

  return (
    <div className={classname} style={style}>
      {prepend && <div className='ipt-prepend'>{prepend}</div>}
      <div className='ipt-inner'>
        {icon && <Icon icon={icon} title={`title-${icon}`} />}
        <input disabled={disabled} {...resProps} />
      </div>
      {append && <div className='ipt-append'>{append}</div>}
    </div>

  )
}

Input.defaultProps = {
  size: 'default',
  disabled: false,
}

export default Input
