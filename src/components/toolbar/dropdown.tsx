import React, { ReactNode, FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { Dropdown as DropdownBase, Menu } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import IconButton from '../icon-button';
import { normalizeIcon } from '../icon';
import { ItemsType, ItemType, ItemGroupType } from './interface';

export interface DropdownProps {
  items: ItemsType;
  prefixCls: string;
  overflowedIndicator?: ReactNode;
  renderItem: (item: ItemType, overflowed?: boolean) => ReactNode;
}

const Dropdown: FC<DropdownProps> = (
  {
    items,
    prefixCls: rootPrefixCls,
    overflowedIndicator,
    renderItem,
  },
) => {
  const [visible, setVisible] = useState(false);
  const intl = useIntl();

  function renderMenuItems(items: ItemsType) {
    return items.map(item => {
      const { key, title, children } = item as ItemGroupType;

      if (children) {
        const childrenDom = renderMenuItems(children) as JSX.Element[];
        return title
          ? (
            <Menu.ItemGroup key={key} title={title}>
              {childrenDom}
            </Menu.ItemGroup>
          )
          : childrenDom;
      }

      return (
        <Menu.Item
          key={key}
          data-closable={item.closable !== false}
        >
          {normalizeIcon(item.icon)}
          {renderItem(item, true)}
        </Menu.Item>
      );
    });
  }

  function onClickMenu(param: ClickParam) {
    const closable = (param.domEvent.currentTarget as Element).getAttribute('data-closable');

    if (closable) {
      setVisible(false);
    }
  }

  const prefixCls = `${rootPrefixCls}-overflowed`;

  return (
    <DropdownBase
      trigger={['click']}
      visible={visible}
      onVisibleChange={visible => setVisible(visible)}
      overlay={(
        <Menu className={`${prefixCls}-menu`} onClick={onClickMenu}>
          {renderMenuItems(items)}
        </Menu>
      )}
    >
      {overflowedIndicator || (
        <IconButton
          icon={<ToolOutlined />}
          title={intl.formatMessage({ id: 'Tools' })}
          className={`${prefixCls}-indicator`}
        />
      )}
    </DropdownBase>
  );
};

export default Dropdown;
