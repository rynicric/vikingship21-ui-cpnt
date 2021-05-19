import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadProps } from './upload'
import Button from '../button'
import Icon from '../icon'

export default {
  title: 'Example/Upload',
  component: Upload,
} as Meta



const TemplateWithButton: Story<UploadProps> = (args) => (
  <Upload
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
    onChange={action('change')}
    {...args}>
    <Button>Click me to upload...</Button>
  </Upload >
)

const TemplateWithBox: Story<UploadProps> = (args) => (
  <Upload
    onProgress={action('progress')}
    onSuccess={action('success')}
    onError={action('error')}
    onChange={action('change')}
    {...args}>
    <p style={{ textAlign: 'center' }}>
      <Icon icon='upload' size='3x' theme='secondary' />
      <br />
      Drag file over to upload...
    </p>
  </Upload >
)

export const ClickUpload = TemplateWithButton.bind({})
ClickUpload.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
}

export const DragUpload = TemplateWithBox.bind({})
DragUpload.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  drag: true,
}

export const CheckFileSize = TemplateWithButton.bind({})
CheckFileSize.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  onBeforeUpload: (file) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('Warning: file too big...')
      return false
    }
    return true
  }
}

export const TransformFile = TemplateWithButton.bind({})
TransformFile.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  onBeforeUpload: (file) => (
    Promise.resolve(new File([file], 'new_file_name.docx', { type: file.type }))
  )
}
