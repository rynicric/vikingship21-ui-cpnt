import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button, { ButtonProps } from './button'

export default {
  title: 'Example/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => (
  <Button onClick={action('clicked')} {...args}>Button</Button>
)

export const Default = Template.bind({})
Default.args = {}

export const Primary = Template.bind({});
Primary.args = {
  btype: 'primary',
}

export const Link = Template.bind({});
Link.args = {
  btype: 'link',
  href: 'www.example.com',
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
}

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
}

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
}
