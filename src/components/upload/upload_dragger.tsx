import React, { useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  uploadFiles: (files: FileList) => void
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { uploadFiles, children } = props
  const [dragover, setDragover] = useState(false)
  const classname = classNames('dragger', {
    'dragover': dragover
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragover(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragover(false)
    uploadFiles(e.dataTransfer.files)
  }
  return (
    <div
      className={classname}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}>
      {children}
    </div>
  )
}

export default Dragger;
