import React from 'react';
import Icon from '../icon';
import Progress from '../progress';
var UploadFileList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: 'upload-list' }, fileList.map(function (item) { return (React.createElement("li", { className: 'upload-item', key: item.id },
        React.createElement("span", { className: "upload-item-name upload-item-" + item.status },
            React.createElement(Icon, { icon: 'file-alt', theme: 'secondary' }),
            item.raw.name),
        React.createElement("span", { className: 'upload-item-status' },
            item.status === 'ready' && React.createElement(Icon, { icon: 'spinner', theme: 'primary' }),
            item.status === 'uploading' && React.createElement(Icon, { icon: 'spinner', spin: true, theme: 'primary' }),
            item.status === 'success' && React.createElement(Icon, { icon: 'check-circle', theme: 'success' }),
            item.status === 'error' && React.createElement(Icon, { icon: 'times-circle', theme: 'danger' })),
        React.createElement("span", { className: "upload-item-actions" },
            React.createElement(Icon, { icon: "times", onClick: function () { return onRemove(item); } })),
        item.status === 'uploading' && React.createElement(Progress, { percent: item.percentage || 0 }))); })));
};
export default UploadFileList;
