import InternalToolbar from './toolbar';
import Item from './item';
import ItemGroup from './group';

type InternalToolbar = typeof InternalToolbar;
interface Toolbar extends InternalToolbar {
  Item: typeof Item;
  ItemGroup: typeof ItemGroup;
}

const Toolbar = InternalToolbar as Toolbar;

Toolbar.Item = Item;
Toolbar.ItemGroup = ItemGroup;

export { ItemsType, ItemType, ItemGroupType } from './interface';
export default Toolbar;
