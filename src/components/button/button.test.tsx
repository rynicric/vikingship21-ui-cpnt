import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const renderComponent = (props: ButtonProps) => (
  <Button {...props}>test-txt</Button>
)

describe('Button Style Test', () => {
  it('Is the default style rendered correctly?', () => {
    const wrapper = render(renderComponent({}))
    const element = wrapper.getByText('test-txt') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn')
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()
  })
  it('Is the setting style rendered correctly?', () => {
    const props: ButtonProps = { btype: 'primary', size: 'lg' }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByText('test-txt')
    expect(element).toHaveClass('btn-primary btn-lg')
  })
  it('Is the link style rendered correctly?', () => {
    const props: ButtonProps = { btype: 'link', href: 'www.example.com' }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByText('test-txt')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn-link')
  })
})

describe('Button Interactive Test', () => {
  it('Is the default interaction correct?', () => {
    const props: ButtonProps = { onClick: jest.fn() }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByText('test-txt')
    fireEvent.click(element)
    expect(props.onClick).toHaveBeenCalled()
  })
  it('Is the disabled interaction correct?', () => {
    const props: ButtonProps = { onClick: jest.fn(), disabled: true }
    const wrapper = render(renderComponent(props))
    const element = wrapper.getByText('test-txt') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(props.onClick).not.toHaveBeenCalled()
  })
})
