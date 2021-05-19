import React from 'react'
import Icon from '../icon'
import Progress from '../progress'
import { FileProps } from './upload'

interface FileListProps {
  /** Getting the upload file list */
  fileList: FileProps[]
  /** Setting the callback function called when delete file item */
  onRemove: (file: FileProps) => void
}

const UploadFileList: React.FC<FileListProps> = (props) => {
  const { fileList, onRemove } = props

  return (
    <ul className='upload-list'>
      {
        fileList.map(item => (
          <li className='upload-item' key={item.id}>
            <span className={`upload-item-name upload-item-${item.status}`}>
              <Icon icon='file-alt' theme='secondary' />
              {item.raw.name}
            </span>
            <span className='upload-item-status'>
              {item.status === 'ready' && <Icon icon='spinner' theme='primary' />}
              {item.status === 'uploading' && <Icon icon='spinner' spin theme='primary' />}
              {item.status === 'success' && <Icon icon='check-circle' theme='success' />}
              {item.status === 'error' && <Icon icon='times-circle' theme='danger' />}
            </span>
            <span className="upload-item-actions">
              <Icon icon="times" onClick={() => onRemove(item)} />
            </span>
            {item.status === 'uploading' && <Progress percent={item.percentage || 0} />}
          </li>
        ))
      }
    </ul>
  )
}

export default UploadFileList
