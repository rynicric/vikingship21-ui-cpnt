import React from 'react';
import { FileProps } from './upload';
interface FileListProps {
    /** Getting the upload file list */
    fileList: FileProps[];
    /** Setting the callback function called when delete file item */
    onRemove: (file: FileProps) => void;
}
declare const UploadFileList: React.FC<FileListProps>;
export default UploadFileList;
