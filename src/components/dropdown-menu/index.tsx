import React, { Key, ReactNode, FC } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import { MenuProps } from 'antd/lib/menu';
import { isURL } from '@/utils/util';
import { normalizeIcon } from '../icon';

export type MenuItem = {
  key: Key;
  title?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
  url?: string;
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
  const { formatMessage } = useIntl();

  function renderItems() {
    return items.map(item => {
      const { divider, key } = item;

      if (divider) {
        return <Menu.Divider key={key} />;
      }

      const { icon, title, url } = item;
      let children = typeof title === 'string' ? formatMessage({ id: title }) : title;

      if (url !== undefined) {
        children = isURL(url)
          ? <a href={url}>{children}</a>
          : <Link to={url}>{children}</Link>;
      }

      return (
        <Menu.Item key={key} icon={normalizeIcon(icon)}>
          {children}
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
