import React from 'react';
declare type UploadStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface FileProps {
    /** Setting the identification */
    id: string;
    /** Setting the raw file information */
    raw: File;
    /** Getting the upload status */
    status?: UploadStatus;
    /** Getting the percentage */
    percentage?: number;
    /** Getting the response information from promise.then */
    response?: any;
    /** Getting the error information from promise.catch */
    error?: any;
}
export interface UploadProps {
    /** Setting general properties, className */
    className?: string;
    /** Setting axios properties, action url */
    action: string;
    /** Setting axios properties, customized headers */
    headers?: {
        [key: string]: any;
    };
    /** Setting axios properties, with credentials */
    withCredentials?: boolean;
    /** Setting input(file) properties, multiple */
    multiple?: boolean;
    /** Setting input(file) properties, accept */
    accept?: string;
    /** Setting formData properties, customized data information */
    data?: {
        [key: string]: any;
    };
    /** Setting verification or conversion before uploading */
    onBeforeUpload?: (file: File) => boolean | Promise<File>;
    /** Setting the callback function called when the upload is in progress */
    onProgress?: (percentage: number, file: FileProps) => void;
    /** Setting the callback function called when the upload is in success */
    onSuccess?: (data: any, file: FileProps) => void;
    /** Setting the callback function called when the upload is in error */
    onError?: (err: any, file: FileProps) => void;
    /** Setting the callback funciton called when the status changed */
    onChange?: (file: FileProps) => void;
    /** Setting the callback function called when delete file item */
    onRemove?: (file: FileProps) => void;
    /** Setting the accept name of back-end */
    keyname?: string;
    /** Setting whether to support drag-and-drop upload method */
    drag?: boolean;
}
/**
 * This is a slightly complicated upload component that
 * supports click upload and drag-and-drop upload.
 *
 * @param props
 */
export declare const Upload: React.FC<UploadProps>;
export default Upload;
