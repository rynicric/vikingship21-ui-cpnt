import { useEffect } from "react";
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target))
                return;
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () { return document.removeEventListener('click', listener); };
    });
}
export default useClickOutside;
