import React, { useState } from 'react';
import classNames from 'classnames';
var Dragger = function (props) {
    var uploadFiles = props.uploadFiles, children = props.children;
    var _a = useState(false), dragover = _a[0], setDragover = _a[1];
    var classname = classNames('dragger', {
        'dragover': dragover
    });
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragover(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDragover(false);
        uploadFiles(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classname, onDragOver: function (e) { return handleDrag(e, true); }, onDragLeave: function (e) { return handleDrag(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
