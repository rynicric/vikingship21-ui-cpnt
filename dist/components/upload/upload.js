var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import UploadFileList from './upload_list';
import Dragger from './upload_dragger';
/**
 * This is a slightly complicated upload component that
 * supports click upload and drag-and-drop upload.
 *
 * @param props
 */
export var Upload = function (props) {
    var className = props.className, children = props.children, keyname = props.keyname, drag = props.drag;
    var onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange;
    var onBeforeUpload = props.onBeforeUpload, onRemove = props.onRemove;
    var action = props.action, headers = props.headers, withCredentials = props.withCredentials;
    var multiple = props.multiple, accept = props.accept, data = props.data;
    var inputRef = useRef(null);
    var _a = useState([]), fileList = _a[0], setFileList = _a[1];
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (inputRef.current)
            inputRef.current.value = '';
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) { return prevList.filter(function (item) { return file.id !== item.id; }); });
        if (onRemove)
            onRemove(file);
    };
    var uploadFiles = function (files) {
        Array.from(files).forEach(function (file) {
            if (onBeforeUpload) {
                var result = onBeforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) { return post(processedFile); });
                    return;
                }
                else if (result === false) {
                    return;
                }
            }
            post(file);
        });
    };
    var post = function (file) {
        var file_ = {
            id: 'upload-file-' + Date.now(),
            raw: file,
            status: 'ready',
            percentage: 0,
        };
        setFileList(function (prevList) { return __spreadArray([file_], prevList); });
        var data_ = new FormData();
        data_.append(keyname || 'upload-file', file);
        if (data)
            Object.keys(data).forEach(function (key) { return data_.append(key, data[key]); });
        axios.post(action, data_, {
            withCredentials: withCredentials,
            headers: __assign({ 'Content-Type': 'multipart/form-data' }, headers),
            onUploadProgress: function (e) {
                var perc = Math.round((e.loaded * 100 / e.total) || 0);
                updateFileStatus(file_.id, { percentage: perc, status: 'uploading' });
                if (onProgress)
                    onProgress(perc, file_);
            }
        }).then(function (resp) {
            updateFileStatus(file_.id, { status: 'success', response: resp.data });
            if (onSuccess)
                onSuccess(resp.data, file_);
            if (onChange)
                onChange(file_);
        }).catch(function (err) {
            updateFileStatus(file_.id, { status: 'error', error: err });
            if (onError)
                onError(err, file_);
            if (onChange)
                onChange(file_);
        });
    };
    var updateFileStatus = function (fileId, info) {
        setFileList(function (prevList) { return prevList.map(function (item) { return (item.id === fileId ? __assign(__assign({}, item), info) : item); }); });
    };
    return (React.createElement("div", { className: classNames(className, 'upload') },
        React.createElement("div", { className: 'upload-inner', onClick: function () { return inputRef.current ? inputRef.current.click() : null; } }, drag ? React.createElement(Dragger, { uploadFiles: uploadFiles }, children) : children),
        React.createElement("input", { ref: inputRef, type: 'file', style: { display: 'none' }, multiple: multiple, accept: accept, onChange: handleChange }),
        React.createElement(UploadFileList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    keyname: 'upload-file'
};
export default Upload;
