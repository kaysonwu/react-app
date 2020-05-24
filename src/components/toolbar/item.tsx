import { FC } from 'react';
import { ItemType } from './interface';

export interface ItemProps extends ItemType {
  children?: null;
}

/**
 * This is a syntactic sugar for `items` prop.
 * So HOC will not work on this.
 */
const Item: FC<ItemProps> = () => null;

export default Item;
