import React, { useState } from 'react';
import classNames from 'classnames';
import MenuContext from './menu_context';
/**
 * This is a simple menu component that provides
 * two styles: horizontal or vertical,
 * allowing you to define a secondary menu.
 *
 * @param props
 */
export var Menu = function (props) {
    var className = props.className, style = props.style, children = props.children;
    var mode = props.mode, defaultItem = props.defaultItem, defaultOpeneds = props.defaultOpeneds, onSelect = props.onSelect;
    var _a = useState(defaultItem), active = _a[0], setActive = _a[1];
    var classname = classNames(className, 'menu', {
        'menu-vertical': mode === 'vertical',
    });
    var handleSelect = function (index) {
        setActive(index);
        if (onSelect)
            onSelect(index);
    };
    var renderChildren = function () { return (React.Children.map(children, function (child, index) {
        var element = child;
        var displayName = element.type.displayName;
        if (displayName === 'MenuItem' || displayName === 'SubMenu') {
            return React.cloneElement(element, { index: index.toString() });
        }
        else {
            console.error('Warning: Menu has a child which is not a MenuItem component');
        }
    })); };
    var context = {
        activeIndex: active ? active : '0',
        handleSelect: handleSelect,
        mode: mode,
        openedIndices: defaultOpeneds,
    };
    return (React.createElement("ul", { className: classname, style: style, "data-testid": 'test-id' },
        React.createElement(MenuContext.Provider, { value: context }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    defaultItem: '0',
    defaultOpeneds: [],
};
export default Menu;
