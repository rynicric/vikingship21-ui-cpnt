import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import { ThemeProps } from '../icon/icon'

export interface ProgressProps {
  /** Setting general properties, className */
  className?: string
  /** Setting general properties, style */
  style?: CSSProperties
  /** Setting the progress value */
  percent: number
  /** Setting the progress theme, i.e. color */
  theme?: ThemeProps
  /** setting the progress whether show value */
  showText?: boolean
}

/**
 * This is a simple progress bar component that
 * supports the upload component.
 *
 * @param props
 */
export const Progress: React.FC<ProgressProps> = (props) => {
  const { className, style, percent, theme, showText } = props
  return (
    <div className={classNames(className, 'progbar')} style={style}>
      <div
        className={`progbar-inner progbar-${theme}`}
        style={{ width: `${percent}%` }}>
        {showText && <span className='progbar-text'>{`${percent}%`}</span>}
      </div>
    </div>
  )
}

Progress.defaultProps = {
  theme: 'primary',
  showText: true,
  style: { height: '16px' },
}

export default Progress
