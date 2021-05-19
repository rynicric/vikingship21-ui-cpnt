import { useState, useEffect } from "react";
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounced = _a[0], setDebounced = _a[1];
    useEffect(function () {
        var timer = window.setTimeout(function () { return setDebounced(value); }, delay);
        return function () { return clearTimeout(timer); };
    }, [value, delay]);
    return debounced;
}
export default useDebounce;
