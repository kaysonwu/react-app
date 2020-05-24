import { Key, ReactNode, ComponentType, ReactElement, MouseEventHandler } from 'react';
import { Breakpoint, ScreenMap } from 'antd/lib/_util/responsiveObserve';

export { Breakpoint, ScreenMap };

export interface ToolProps {
  title?: ReactNode;
  icon?: ReactNode;
  overflowed?: boolean;
}

export interface ItemType {
  key?: Key;
  title?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  component?: ComponentType<ToolProps> | ReactElement;
  responsive?: Breakpoint[] | Record<Breakpoint, number | boolean>;
  onClick?: MouseEventHandler;
}

export interface ItemGroupType extends Omit<ItemType, 'component'> {
  children: ItemType[];
}

export type ItemsType = (ItemType | ItemGroupType)[];
