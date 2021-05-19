import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from './autocomplete'

const renderComponent = (props: AutoCompleteProps) => (
  <AutoComplete placeholder='test-txt' {...props} />
)

const fetchSuggMethod = (query: string) => {
  const suggestions = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
  ]
  return suggestions.filter(item => item.value.includes(query))
}

describe('AutoComplete Interactive Test', () => {
  it('Is the default interaction correct?', async () => {
    const props: AutoCompleteProps = {
      fetchSugg: fetchSuggMethod,
      onSelect: jest.fn(),
    }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByPlaceholderText('test-txt') as HTMLInputElement
    fireEvent.change(element, { target: { value: 'a' } })
    await waitFor(() => expect(wrapper.queryByText('ab')).toBeInTheDocument())
    expect(wrapper.container.querySelectorAll('.autocpl-list-item').length).toEqual(2)
    fireEvent.click(wrapper.getByText('ab'))
    expect(props.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(element.value).toBe('ab')
    // input change => have two sugg item => click one => fill the input.
  })
  it('Is the keyboard support interaction correct?', async () => {
    const props: AutoCompleteProps = {
      fetchSugg: fetchSuggMethod,
      onSelect: jest.fn(),
    }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByPlaceholderText('test-txt') as HTMLInputElement
    fireEvent.change(element, { target: { value: 'a' } })
    await waitFor(() => expect(wrapper.queryByText('ab')).toBeInTheDocument())
    const element1 = wrapper.queryByText('ab')
    const element2 = wrapper.queryByText('abc')
    fireEvent.keyDown(element, { keyCode: 40 }) // DOWN
    expect(element1).toHaveClass('active')
    fireEvent.keyDown(element, { keyCode: 40 }) // DOWN
    expect(element2).toHaveClass('active')
    expect(element1).not.toHaveClass('active')
    fireEvent.keyDown(element, { keyCode: 38 }) // UP
    expect(element1).toHaveClass('active')
    fireEvent.keyDown(element, { keyCode: 13 }) // RETURN
    expect(props.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    await waitFor(() => expect(wrapper.queryByText('ab')).not.toBeInTheDocument())
  })
  it('Is the click outside to hidden suggestion correct?', async () => {
    const props: AutoCompleteProps = {
      fetchSugg: fetchSuggMethod,
      onSelect: jest.fn(),
    }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByPlaceholderText('test-txt') as HTMLInputElement
    fireEvent.change(element, { target: { value: 'a' } })
    await waitFor(() => expect(wrapper.queryByText('ab')).toBeInTheDocument())
    fireEvent.click(document)
    await waitFor(() => expect(wrapper.queryByText('ab')).not.toBeInTheDocument())
  })
})
