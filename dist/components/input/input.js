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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
/**
 * This is a simple input component that allows you
 * to add icon, prefixe and suffixe.
 *
 * @param props
 */
export var Input = function (props) {
    var _a;
    var className = props.className, size = props.size, disabled = props.disabled, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, resProps = __rest(props, ["className", "size", "disabled", "icon", "prepend", "append", "style"]);
    var classname = classNames(className, 'ipt', (_a = {},
        _a["ipt-" + size] = size && size !== 'default',
        _a['ipt-addon-prepend'] = prepend,
        _a['ipt-addon-append'] = append,
        _a['disabled'] = disabled,
        _a));
    // fixing controlled value
    if ('value' in props) {
        delete resProps.defaultValue;
        resProps.value = props.value == null ? '' : props.value;
    }
    return (React.createElement("div", { className: classname, style: style },
        prepend && React.createElement("div", { className: 'ipt-prepend' }, prepend),
        React.createElement("div", { className: 'ipt-inner' },
            icon && React.createElement(Icon, { icon: icon, title: "title-" + icon }),
            React.createElement("input", __assign({ disabled: disabled }, resProps))),
        append && React.createElement("div", { className: 'ipt-append' }, append)));
};
Input.defaultProps = {
    size: 'default',
    disabled: false,
};
export default Input;
