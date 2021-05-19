import React, { useState, useRef, useEffect } from 'react'
import { ReactElement, ChangeEvent, KeyboardEvent } from 'react'
import classNames from 'classnames'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Icon from '../icon'
import Transition from '../transition'
import Input, { InputProps } from '../input/input'

export type DataSourceProps<T = {}> = T & { value: string }
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** Setting the suggestion fetching method */
  fetchSugg: (query: string) => DataSourceProps[] | Promise<DataSourceProps[]>
  /** Setting the suggest displaying method */
  renderSugg?: (item: DataSourceProps) => ReactElement
  /** Setting the callback function called when you select one item */
  onSelect?: (item: DataSourceProps) => void
}

/**
 * This is a simple auto-complete component, please
 * provide `fetchSugg` to improve the function.
 *
 * @param props
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSugg, renderSugg, onSelect, value, ...resProps } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestion, setSuggestion] = useState<DataSourceProps[]>([])
  const [suggMarkIndex, setSuggMarkIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [opened, setOpen] = useState(false)
  const triggerFetch = useRef(false)
  const debouncedValue = useDebounce(inputValue, 300)

  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => setOpen(false))

  useEffect(() => {
    setSuggestion([])
    setSuggMarkIndex(-1)
    setOpen(false)
    if (debouncedValue && triggerFetch.current) {
      const result = fetchSugg(debouncedValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then(data => {
          setLoading(false)
          setSuggestion(data)
          setOpen(data.length > 0 ? true : false)
        })
      }
      else {  // result instanceof DataSourceProps[]
        setSuggestion(result)
        setOpen(result.length > 0 ? true : false)
      }
    }
  }, [debouncedValue, fetchSugg])

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerFetch.current = true
  }

  const handelKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const boundary = (idx: number) => {
      if (idx < 0) idx = 0
      if (idx >= suggestion.length) idx = suggestion.length - 1
      return idx
    }
    switch (e.keyCode) {
      case 38: setSuggMarkIndex(boundary(suggMarkIndex - 1)); break  // UP
      case 40: setSuggMarkIndex(boundary(suggMarkIndex + 1)); break  // DOWN
      case 27: setOpen(false); setSuggestion([]); break  // ESC
      case 13: // RETURN
        if (suggestion[suggMarkIndex]) {
          handleSelect(suggestion[suggMarkIndex])
        }
        break
      default: break
    }
  }

  const handleSelect = (item: DataSourceProps) => {
    setInputValue(item.value)
    triggerFetch.current = false
    if (onSelect) onSelect(item)
  }

  const renderChildren = () => (
    suggestion.map((item, index) => (
      <li
        key={index}
        onClick={() => handleSelect(item)}
        className={classNames('autocpl-list-item', {
          'active': index === suggMarkIndex
        })}>
        {renderSugg ? renderSugg(item) : item.value}
      </li>
    ))
  )

  return (
    <div className='autocpl' ref={componentRef}>
      <Input
        value={inputValue || ''}
        onChange={handelChange}
        onKeyDown={handelKeyDown}
        {...resProps} />
      <Transition
        in={opened || loading}
        timeout={300}
        animation={'zoom-in-top'}>
        <ul className='autocpl-list'>
          {loading && <li><Icon icon='spinner' spin /></li>}
          {renderChildren()}
        </ul>
      </Transition>
    </div>
  )
}

AutoComplete.defaultProps = {}
export default AutoComplete
