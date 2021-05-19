import React from 'react';
import classNames from 'classnames';
/**
 * This is a simple progress bar component that
 * supports the upload component.
 *
 * @param props
 */
export var Progress = function (props) {
    var className = props.className, style = props.style, percent = props.percent, theme = props.theme, showText = props.showText;
    return (React.createElement("div", { className: classNames(className, 'progbar'), style: style },
        React.createElement("div", { className: "progbar-inner progbar-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: 'progbar-text' }, percent + "%"))));
};
Progress.defaultProps = {
    theme: 'primary',
    showText: true,
    style: { height: '16px' },
};
export default Progress;
