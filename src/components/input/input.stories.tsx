// import { useState, ChangeEvent } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input, { InputProps } from './input'

export default {
  title: 'Example/Input',
  component: Input,
} as Meta

const Template: Story<InputProps> = (args) => (
  <Input placeholder='placeholder' onChange={action('changed')} {...args} />
)

// const ControlledInput: Story<InputProps> = (args) => {
//   const [value, setValue] = useState('')
//   return (
//     <Input
//       {...args}
//       value={value}
//       defaultValue={value}
//       onChange={(e: ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value)
//       }}
//     />
//   )
// }

// export const ControllInput = ControlledInput.bind({})
// ControllInput.args = {}

export const Default = Template.bind({})
Default.args = {}

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

export const WithAddon = Template.bind({});
WithAddon.args = {
  icon: 'search',
  prepend: 'https://',
  append: '.com',
}
