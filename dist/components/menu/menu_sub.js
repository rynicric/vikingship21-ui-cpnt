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
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Transition from '../transition';
import MenuContext from './menu_context';
/**
 * This is the part of the menu component, sub-menu.
 *
 * @param props
 */
var SubMenu = function (props) {
    var className = props.className, title = props.title, style = props.style, index = props.index, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var isOpen = (index && context.mode === 'vertical' ?
        context.openedIndices.includes(index) : false);
    var _a = useState(isOpen), opened = _a[0], setOpen = _a[1];
    var classname = classNames(className, 'menu-item menu-sub', {
        'disabled': disabled,
        'opened': opened,
        'active': (index === context.activeIndex ||
            context.activeIndex.startsWith(index)),
    });
    var handelOpen = (function () {
        var timer;
        return function (e, toggle) {
            clearTimeout(timer);
            e.preventDefault();
            timer = setTimeout(function () { return setOpen(toggle == null ? !opened : toggle); }, 100);
        };
    })();
    var clickEvents = context.mode === 'vertical' ? { onClick: handelOpen } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { return handelOpen(e, true); },
        onMouseLeave: function (e) { return handelOpen(e, false); },
    } : {};
    var renderChildren = function () { return (React.Children.map(children, function (child, idx) {
        var element = child;
        var displayName = element.type.displayName;
        if (displayName === 'MenuItem') {
            return React.cloneElement(element, { index: index + "-" + idx });
        }
        else {
            console.error('Warning: SubMenu has a child which is not a MenuItem component');
        }
    })); };
    return (React.createElement("li", __assign({ className: classname, style: style }, hoverEvents),
        React.createElement("span", __assign({ className: 'menu-sub-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down' })),
        React.createElement(Transition, { in: opened, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: 'menu-sub-list' }, renderChildren()))));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
