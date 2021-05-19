import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, createEvent } from '@testing-library/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios'
import Upload, { UploadProps } from './upload'

const mockedAxios = axios as jest.Mocked<typeof axios>
jest.mock('axios')

type MockIconProps = { icon: IconProp; onClick: () => void }
jest.mock('../icon', () => (
  ({ icon, onClick }: MockIconProps) => <span onClick={onClick}>{icon}</span>)
)

const testFileData = new File(['testfile'], 'test.png', { type: 'image/png' })
const renderComponent = (props: UploadProps) => (
  <Upload {...props} >test-txt</Upload>
)

describe('Upload Interactive Test', () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ 'data': 'resolved' })
  })
  it('Is the default upload process correct?', async () => {
    const props: UploadProps = {
      action: 'www.example.com',
      onSuccess: jest.fn(),
      onChange: jest.fn(),
      onRemove: jest.fn()
    }
    const wrapper = render(renderComponent(props))
    const element = wrapper.container.querySelector('input') as HTMLInputElement
    expect(element).not.toBeVisible()
    fireEvent.change(element, { target: { files: [testFileData] } })
    expect(wrapper.queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => expect(wrapper.queryByText('test.png')).toBeInTheDocument())
    expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    expect(props.onSuccess).toHaveBeenCalledWith('resolved',
      expect.objectContaining({
        raw: testFileData,
        status: 'ready',
      }))
    expect(props.onChange).toHaveBeenCalled()
    expect(wrapper.queryByText('times')).toBeInTheDocument()
    fireEvent.click(wrapper.queryByText('times') as HTMLElement)
    expect(wrapper.queryByText('test.png')).not.toBeInTheDocument()
    expect(props.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFileData,
      status: 'success',
    }))

  })
  it('Is the drag-and-drop method correct?', async () => {
    const props: UploadProps = {
      action: 'www.example.com',
      drag: true,
      onSuccess: jest.fn(),
    }
    const wrapper = render(renderComponent(props))
    const element = wrapper.queryByText('test-txt') as HTMLElement
    fireEvent.dragOver(element)
    expect(element).toHaveClass('dragover')
    fireEvent.dragLeave(element)
    expect(element).not.toHaveClass('dragover')
    const mockDropEvent = createEvent.drop(element)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: { files: [testFileData] }
    })
    fireEvent(element, mockDropEvent)
    await waitFor(() => expect(wrapper.queryByText('test.png')).toBeInTheDocument())
    expect(props.onSuccess).toHaveBeenCalledWith('resolved',
      expect.objectContaining({
        raw: testFileData,
        status: 'ready',
      }))
  })
})
