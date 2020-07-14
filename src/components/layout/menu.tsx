import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';
import { MenuProps as Props } from 'antd/lib/menu';
import { isURL } from '@/utils/util';
import { normalizeIcon } from '../icon';

const { SubMenu, ItemGroup, Item } = AntdMenu;

interface MenuProps extends Props {
  dataSource?: IMenu[];
  // For support 'top-sider' and 'sider2' layout
  depth?: number;
}

const Menu: FC<MenuProps> = (
  {
    dataSource,
    depth = Infinity,
    mode,
    defaultSelectedKeys,
    ...props
  },
) => {
  const { formatMessage } = useIntl();

  function renderMenus(menus: IMenu[], dep: number) {
    return menus.filter(menu => !menu.hide).map(menu => {
      const { id, name, icon, url, disabled, is_group: isGroup, children } = menu;
      const title = formatMessage({ id: name });
      const iconNode = normalizeIcon(icon);

      if (children && dep > 1) {
        const childrenNode = renderMenus(children, dep - 1);

        if (childrenNode.length > 0) {
          return isGroup
            ? (
              <ItemGroup
                key={id}
                title={title}
              >
                {childrenNode}
              </ItemGroup>
            )
            : (
              <SubMenu
                key={id}
                icon={iconNode}
                title={title}
                disabled={disabled}
              >
                {childrenNode}
              </SubMenu>
            );
        }
      }

      return (
        <Item
          key={id}
          icon={iconNode}
          disabled={disabled}
        >
          {isURL(url)
            ? <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
            : <Link to={url}>{title}</Link>}
        </Item>
      );
    });
  }

  return (
    <AntdMenu
      {...props}
      mode={mode}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={mode === 'inline' ? defaultSelectedKeys : []}
    >
      {dataSource && renderMenus(dataSource, depth)}
    </AntdMenu>
  );
};

export default Menu;
