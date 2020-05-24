import { FC, ReactElement } from 'react';
import { ItemGroupType } from './interface';
import { ItemProps } from './item';

export interface ItemGroupProps extends Omit<ItemGroupType, 'children'> {
  children: ReactElement<ItemProps> | ReactElement<ItemProps>[];
}

/**
 * This is a syntactic sugar for `items` prop.
 * So HOC will not work on this.
 */
const ItemGroup: FC<ItemGroupProps> = () => null;

export default ItemGroup;
