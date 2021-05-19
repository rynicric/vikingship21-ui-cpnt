import Menu from './menu';
import MenuItem from './menu_item';
import SubMenu from './menu_sub';
var MenuComponent = Menu;
MenuComponent.Item = MenuItem;
MenuComponent.SubMenu = SubMenu;
export default MenuComponent;
