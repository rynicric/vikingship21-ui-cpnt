import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Input, { InputProps } from './input'

const renderComponent = (props: InputProps) => (
  <Input placeholder='test-txt' {...props} />
)

describe('Input Style Test', () => {
  it('Is the default style rendered correctly?', () => {
    const wrapper = render(renderComponent({}))
    const element = wrapper.getByPlaceholderText('test-txt') as HTMLInputElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('INPUT')
    expect(element.disabled).toBeFalsy()
  })
  it('Is the setting style (size) rendered correctly?', () => {
    const props: InputProps = { size: 'lg' }
    const wrapper = render(renderComponent(props))
    const element = wrapper.container.querySelector('.ipt')
    expect(element).toHaveClass('ipt-lg')
  })
  it('Is the setting style (addon) rendered correctly?', () => {
    const props: InputProps = { icon: 'search', prepend: 'pre', append: 'app' }
    const wrapper = render(renderComponent(props))
    const element = wrapper.container.querySelector('.ipt')
    expect(element).toHaveClass('ipt-addon-prepend ipt-addon-append')
    expect(wrapper.queryByTitle('title-search')).toBeInTheDocument()
    expect(wrapper.queryByText('pre')).toBeInTheDocument()
    expect(wrapper.queryByText('app')).toBeInTheDocument()
  })
})

describe('Input Interactive Test', () => {
  it('Is the default interaction correct?', () => {
    const props: InputProps = { onChange: jest.fn() }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByPlaceholderText('test-txt') as HTMLInputElement
    fireEvent.change(element, { target: { value: 'changed-txt' } })
    expect(props.onChange).toHaveBeenCalled()
    expect(element.value).toEqual('changed-txt')
  })
  it('Is the disabled interaction correct?', () => {
    const props: InputProps = { onChange: jest.fn(), disabled: true }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByPlaceholderText('test-txt') as HTMLInputElement
    expect(element.disabled).toBeTruthy()
    fireEvent.change(element, { target: { value: 'changed-txt' } })
    // expect(element.value).not.toEqual('changed-txt') // TODO
    // expect(props.onChange).not.toHaveBeenCalled() // TODO
    // See:
    // https://developers.weixin.qq.com/community/develop/
    // doc/0002e4eb9908c05811369103556000
  })
})
