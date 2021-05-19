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
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Icon from '../icon';
import Transition from '../transition';
import Input from '../input/input';
/**
 * This is a simple auto-complete component, please
 * provide `fetchSugg` to improve the function.
 *
 * @param props
 */
export var AutoComplete = function (props) {
    var fetchSugg = props.fetchSugg, renderSugg = props.renderSugg, onSelect = props.onSelect, value = props.value, resProps = __rest(props, ["fetchSugg", "renderSugg", "onSelect", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestion = _b[0], setSuggestion = _b[1];
    var _c = useState(-1), suggMarkIndex = _c[0], setSuggMarkIndex = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(false), opened = _e[0], setOpen = _e[1];
    var triggerFetch = useRef(false);
    var debouncedValue = useDebounce(inputValue, 300);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { return setOpen(false); });
    useEffect(function () {
        setSuggestion([]);
        setSuggMarkIndex(-1);
        setOpen(false);
        if (debouncedValue && triggerFetch.current) {
            var result = fetchSugg(debouncedValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    setSuggestion(data);
                    setOpen(data.length > 0 ? true : false);
                });
            }
            else { // result instanceof DataSourceProps[]
                setSuggestion(result);
                setOpen(result.length > 0 ? true : false);
            }
        }
    }, [debouncedValue, fetchSugg]);
    var handelChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerFetch.current = true;
    };
    var handelKeyDown = function (e) {
        var boundary = function (idx) {
            if (idx < 0)
                idx = 0;
            if (idx >= suggestion.length)
                idx = suggestion.length - 1;
            return idx;
        };
        switch (e.keyCode) {
            case 38:
                setSuggMarkIndex(boundary(suggMarkIndex - 1));
                break; // UP
            case 40:
                setSuggMarkIndex(boundary(suggMarkIndex + 1));
                break; // DOWN
            case 27:
                setOpen(false);
                setSuggestion([]);
                break; // ESC
            case 13: // RETURN
                if (suggestion[suggMarkIndex]) {
                    handleSelect(suggestion[suggMarkIndex]);
                }
                break;
            default: break;
        }
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        triggerFetch.current = false;
        if (onSelect)
            onSelect(item);
    };
    var renderChildren = function () { return (suggestion.map(function (item, index) { return (React.createElement("li", { key: index, onClick: function () { return handleSelect(item); }, className: classNames('autocpl-list-item', {
            'active': index === suggMarkIndex
        }) }, renderSugg ? renderSugg(item) : item.value)); })); };
    return (React.createElement("div", { className: 'autocpl', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue || '', onChange: handelChange, onKeyDown: handelKeyDown }, resProps)),
        React.createElement(Transition, { in: opened || loading, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: 'autocpl-list' },
                loading && React.createElement("li", null,
                    React.createElement(Icon, { icon: 'spinner', spin: true })),
                renderChildren()))));
};
AutoComplete.defaultProps = {};
export default AutoComplete;
