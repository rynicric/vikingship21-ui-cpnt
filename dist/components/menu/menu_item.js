import React, { useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './menu_context';
/**
 * This is the part of the menu component, item.
 *
 * @param props
 */
var MenuItem = function (props) {
    var className = props.className, style = props.style, index = props.index, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var classname = classNames(className, 'menu-item', {
        'disabled': disabled,
        'active': index === context.activeIndex,
    });
    var handleClick = function () {
        if (context.handleSelect && !disabled && typeof index === 'string') {
            context.handleSelect(index);
        }
    };
    return (React.createElement("li", { className: classname, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
