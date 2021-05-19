/// <reference types="react" />
import { MenuType } from './menu';
export interface IMenuContext {
    activeIndex: string;
    handleSelect?: (index: string) => void;
    mode?: MenuType;
    openedIndices?: string[];
}
declare const MenuContext: import("react").Context<IMenuContext>;
export default MenuContext;
