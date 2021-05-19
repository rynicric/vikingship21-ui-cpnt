import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menu_item'
import SubMenu, { SubMenuProps } from './menu_sub'

jest.mock('../icon', () => (() => <i className='fa' />))
jest.mock('react-transition-group', () => (
  { CSSTransition: (props: any) => props.children }
))

const renderComponent = (props: MenuProps, itemProps: MenuItemProps,
  subProps: SubMenuProps) => (
  <Menu {...props}>
    <MenuItem>test-txt-1</MenuItem>
    <MenuItem {...itemProps}>test-txt-2</MenuItem>
    <SubMenu title='test-txt-3' {...subProps}>
      <MenuItem>test-txt-4</MenuItem>
    </SubMenu>
  </Menu>
)

const renderStyle = () => {
  const css: string = `
    .menu-sub-list { display: none; }
    .menu-sub.opened .menu-sub-list{ display:block; }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = css
  return style
}

describe('Menu Style Test', () => {
  it('Is the default style rendered correctly?', () => {
    const wrapper = render(renderComponent({}, {}, {}))
    const element = wrapper.getByTestId('test-id')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('menu')
    expect(element.tagName).toEqual('UL')
    expect(element.querySelectorAll(':scope > li').length).toEqual(3)
  })
  it('Is the default style rendered correctly? (vertical)', () => {
    const props: MenuProps = { mode: 'vertical' }
    const wrapper = render(renderComponent(props, {}, {}))
    const element = wrapper.getByTestId('test-id')
    expect(element).toHaveClass('menu menu-vertical')
  })
  it('Is the openedIndices rendered correctly? (vertical)', () => {
    const props: MenuProps = { defaultOpeneds: ['2'], mode: 'vertical' }
    const wrapper = render(renderComponent(props, {}, {}))
    const element4 = wrapper.getByText('test-txt-4')
    expect(element4).toBeVisible()
  })
})

describe('Menu Interactive Test', () => {
  it('Is the click activation event correct?', () => {
    const props: MenuProps = { onSelect: jest.fn() }
    const wrapper = render(renderComponent(props, {}, {}))
    const element1 = wrapper.getByText('test-txt-1')
    const element2 = wrapper.getByText('test-txt-2')
    expect(element1).toHaveClass('active')
    expect(element2).not.toHaveClass('active')
    expect(props.onSelect).not.toHaveBeenCalled()
    fireEvent.click(element2)
    expect(element1).not.toHaveClass('active')
    expect(element2).toHaveClass('active')
    expect(props.onSelect).toHaveBeenCalled()
  })
  it('Is the disabled interaction correct?', () => {
    const props: MenuProps = { onSelect: jest.fn() }
    const itemProps: MenuItemProps = { disabled: true }
    const wrapper = render(renderComponent(props, itemProps, {}))
    const element = wrapper.getByText('test-txt-2')
    expect(element).toHaveClass('disabled')
    fireEvent.click(element)
    expect(props.onSelect).not.toHaveBeenCalled()
  })
  it('Is the hover show dropdown correct? (horizontal)', async () => {
    const props: MenuProps = { onSelect: jest.fn() }
    const wrapper = render(renderComponent(props, {}, {}))
    wrapper.container.append(renderStyle())
    const element3 = wrapper.getByText('test-txt-3')
    const element4 = wrapper.getByText('test-txt-4')
    expect(element4).not.toBeVisible()
    fireEvent.mouseEnter(element3)
    await waitFor(() => expect(element4).toBeVisible())
    fireEvent.click(element4)
    expect(props.onSelect).toHaveBeenCalledWith('2-0')
    fireEvent.mouseLeave(element3)
    await waitFor(() => expect(element4).not.toBeVisible())
  })
  it('Is the click show dropdown correct? (vertical)', async () => {
    const props: MenuProps = { onSelect: jest.fn(), mode: 'vertical' }
    const wrapper = render(renderComponent(props, {}, {}))
    wrapper.container.append(renderStyle())
    const element3 = wrapper.getByText('test-txt-3')
    const element4 = wrapper.getByText('test-txt-4')
    expect(element4).not.toBeVisible()
    fireEvent.click(element3)
    await waitFor(() => expect(element4).toBeVisible())
    fireEvent.click(element3)
    await waitFor(() => expect(element4).not.toBeVisible())
  })
})
