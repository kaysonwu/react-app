import React, { Key, ReactNode, FC } from 'react';
import { useIntl } from 'react-intl';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import { MenuProps } from 'antd/lib/menu';
import Icon from '../icon';

export type MenuItem = {
  key: Key;
  title?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownMenuProps extends
Omit<DropDownProps, 'overlay'>,
Pick<MenuProps, 'theme' | 'defaultSelectedKeys' | 'onSelect'> {
  children: React.ReactNode;
  items: MenuItem[];
}

const DropdownMenu: FC<DropdownMenuProps> = props => {
  const {
    items,
    theme,
    defaultSelectedKeys,
    onSelect,
    ...reset
  } = props;
  const intl = useIntl();

  function renderItems() {
    return items.map(item => {
      const { divider, key } = item;

      if (divider) {
        return <Menu.Divider key={key} />;
      }

      let { icon, title } = item;

      if (typeof icon === 'string') {
        icon = <Icon type={icon} />;
      }

      if (typeof title === 'string') {
        title = intl.formatMessage({ id: title });
      }

      return (
        <Menu.Item key={key} icon={icon}>
          {title}
        </Menu.Item>
      );
    });
  }

  return (
    <Dropdown
      placement="bottomCenter"
      {...reset}
      overlay={(
        <Menu
          theme={theme}
          defaultSelectedKeys={defaultSelectedKeys}
          selectable={onSelect !== undefined}
          onSelect={onSelect}
        >
          {renderItems()}
        </Menu>
      )}
    />
  );
};

export default DropdownMenu;
