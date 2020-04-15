import React from 'react';
import { Menu } from 'antd';
import { MenuProps } from "antd/lib/menu";
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Icon from '@/components/icon';
import { isURL } from './util';

export function renderMenus(menus: IMenu[], props: MenuProps = {}) {
  return (
    <Menu {...props}>
      {menus.map(menu => renderMenu(menu))}
    </Menu>
  );
}

function renderMenu({ name, icon, url, children, ...props }: IMenu) {
  const title = (
    <>
      {typeof icon === 'string' ? <Icon type={icon} />: icon}
      {isURL(url) 
        ? <a href={url} target="_blank"><FormattedMessage id={name} /></a>
        : <Link to={url}><FormattedMessage id={name} /></Link>
      }
    </>
  );

  if (!children) {
    return <Menu.Item {...props}>{title}</Menu.Item>;
  }

  return (
    <Menu.SubMenu {...props} title={title}>
      {children.map(menu => renderMenu(menu))}
    </Menu.SubMenu>
  );
}
