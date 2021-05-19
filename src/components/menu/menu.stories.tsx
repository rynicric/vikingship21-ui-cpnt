import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { MenuProps } from './menu'
import Menu from './index'

export default {
  title: 'Example/Menu',
  component: Menu,
} as Meta

const Template: Story<MenuProps> = (args) => (
  <Menu onSelect={action('clicked')} {...args}>
    <Menu.Item>Home</Menu.Item>
    <Menu.Item>About</Menu.Item>
    <Menu.SubMenu title='More'>
      <Menu.Item>Dropdown 1</Menu.Item>
      <Menu.Item>Dropdown 2</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item disabled>Disabled</Menu.Item>
    <Menu.SubMenu title='Disabled' disabled>
      <Menu.Item>Dropdown 1</Menu.Item>
      <Menu.Item>Dropdown 2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
)

export const Horizontal = Template.bind({});
Horizontal.args = {
  mode: 'horizontal'
}

export const Vertical = Template.bind({});
Vertical.args = {
  mode: 'vertical'
}
