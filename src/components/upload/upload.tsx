import React, { useRef, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import UploadFileList from './upload_list'
import Dragger from './upload_dragger'

type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface FileProps {
  /** Setting the identification */
  id: string
  /** Setting the raw file information */
  raw: File
  /** Getting the upload status */
  status?: UploadStatus
  /** Getting the percentage */
  percentage?: number
  /** Getting the response information from promise.then */
  response?: any
  /** Getting the error information from promise.catch */
  error?: any
}

export interface UploadProps {
  /** Setting general properties, className */
  className?: string
  /** Setting axios properties, action url */
  action: string
  /** Setting axios properties, customized headers */
  headers?: { [key: string]: any }
  /** Setting axios properties, with credentials */
  withCredentials?: boolean
  /** Setting input(file) properties, multiple */
  multiple?: boolean
  /** Setting input(file) properties, accept */
  accept?: string
  /** Setting formData properties, customized data information */
  data?: { [key: string]: any }
  /** Setting verification or conversion before uploading */
  onBeforeUpload?: (file: File) => boolean | Promise<File>
  /** Setting the callback function called when the upload is in progress */
  onProgress?: (percentage: number, file: FileProps) => void
  /** Setting the callback function called when the upload is in success */
  onSuccess?: (data: any, file: FileProps) => void
  /** Setting the callback function called when the upload is in error */
  onError?: (err: any, file: FileProps) => void
  /** Setting the callback funciton called when the status changed */
  onChange?: (file: FileProps) => void
  /** Setting the callback function called when delete file item */
  onRemove?: (file: FileProps) => void
  /** Setting the accept name of back-end */
  keyname?: string
  /** Setting whether to support drag-and-drop upload method */
  drag?: boolean
}

/**
 * This is a slightly complicated upload component that
 * supports click upload and drag-and-drop upload.
 *
 * @param props
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const { className, children, keyname, drag } = props
  const { onProgress, onSuccess, onError, onChange } = props
  const { onBeforeUpload, onRemove } = props
  const { action, headers, withCredentials } = props
  const { multiple, accept, data } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<FileProps[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRemove = (file: FileProps) => {
    setFileList(prevList => prevList.filter(item => file.id !== item.id))
    if (onRemove) onRemove(file)
  }

  const uploadFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (onBeforeUpload) {
        const result = onBeforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => post(processedFile))
          return
        } else if (result === false) {
          return
        }
      }
      post(file)
    })
  }

  const post = (file: File) => {
    let file_: FileProps = {
      id: 'upload-file-' + Date.now(),
      raw: file,
      status: 'ready',
      percentage: 0,
    }
    setFileList(prevList => [file_, ...prevList])

    const data_ = new FormData()
    data_.append(keyname || 'upload-file', file)
    if (data) Object.keys(data).forEach(key => data_.append(key, data[key]))
    axios.post(action, data_, {
      withCredentials,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      onUploadProgress: (e) => {
        let perc = Math.round((e.loaded * 100 / e.total) || 0)
        updateFileStatus(file_.id, { percentage: perc, status: 'uploading' })
        if (onProgress) onProgress(perc, file_)
      }
    }).then(resp => {
      updateFileStatus(file_.id, { status: 'success', response: resp.data })
      if (onSuccess) onSuccess(resp.data, file_)
      if (onChange) onChange(file_)
    }).catch(err => {
      updateFileStatus(file_.id, { status: 'error', error: err })
      if (onError) onError(err, file_)
      if (onChange) onChange(file_)
    })
  }

  const updateFileStatus = (fileId: string, info: Partial<FileProps>) => {
    setFileList(prevList => prevList.map(item => (
      item.id === fileId ? { ...item, ...info } : item
    )))
  }

  return (
    <div className={classNames(className, 'upload')}>
      <div
        className='upload-inner'
        onClick={() => inputRef.current ? inputRef.current.click() : null}>
        {drag ? <Dragger uploadFiles={uploadFiles}>{children}</Dragger> : children}
      </div>
      <input
        ref={inputRef}
        type='file'
        style={{ display: 'none' }}
        multiple={multiple}
        accept={accept}
        onChange={handleChange} />
      <UploadFileList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  keyname: 'upload-file'
}

export default Upload
