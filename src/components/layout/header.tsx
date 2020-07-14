import React, { FC, CSSProperties, MouseEventHandler, useMemo } from 'react';
import classNames from 'classnames';
import { Layout, Spin, Avatar } from 'antd';
import {
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { SelectParam } from 'antd/lib/menu';
import { getLocale, setLocale } from '@/utils/locale';
import DropdownMenu, { MenuItem } from '../dropdown-menu';
import Logo from './logo';
import Menu from './menu';

const languages: MenuItem[] = [
  {
    key: 'zh-CN',
    title: '简体中文',
  },
  {
    key: 'en',
    title: 'English',
  },
];
const userMenus: MenuItem[] = [
  {
    key: 'settings',
    icon: <SettingOutlined />,
    title: 'Account Settings',
    url: '/account/settings',
  },
  {
    key: 'logout',
    icon: <PoweroffOutlined />,
    title: 'Logout',
  },
];

interface PageHeaderProps {
  logo?: string;
  menus?: IMenu[];
  depth?: number;
  user?: IUser;
  theme?: 'light' | 'dark';
  collapsed?: boolean;
  defaultSelectedKeys?: string[];
  prefixCls?: string;
  style?: CSSProperties;
  onClickLogo?: MouseEventHandler;
  onCollapse?: MouseEventHandler;
}

const Header: FC<PageHeaderProps> = props => {
  const {
    logo,
    menus,
    depth,
    user,
    theme,
    collapsed,
    defaultSelectedKeys,
    prefixCls: rootPrefixCls = '',
    style,
    onClickLogo,
    onCollapse,
  } = props;
  const language = useMemo(() => getLocale(), []);

  // Style
  const prefixCls = `${rootPrefixCls}-head`;
  const cls = classNames(prefixCls, {
    [`${prefixCls}-dark`]: theme === 'dark',
    [`${prefixCls}-light`]: theme === 'light',
  });

  function changeLocale({ key }: SelectParam) {
    setLocale(key);
  }

  return (
    <Layout.Header className={cls} style={style}>
      {logo && <Logo key="logo" src={logo} onClick={onClickLogo} />}
      {menus ? (
        <Menu
          key="menu"
          mode="horizontal"
          dataSource={menus}
          depth={depth}
          theme={theme}
          defaultSelectedKeys={defaultSelectedKeys}
        />
      ) : (
        <div className={`${prefixCls}-left`}>
          <span role="button" tabIndex={-1} className={`${prefixCls}-menu-trigger`} onClick={onCollapse}>
            {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </span>
        </div>
      )}
      <div className={`${prefixCls}-actionbar`}>
        {user ? (
          <DropdownMenu key="user" items={userMenus}>
            <span className={`${prefixCls}-actionbar-action`}>
              <Avatar src={user.avatar} alt={user.name} />
              <span className="nickname">{user.name}</span>
            </span>
          </DropdownMenu>
        ) : (
          <span className={`${prefixCls}-actionbar-action`}>
            <Spin />
          </span>
        )}
        <DropdownMenu
          key="language"
          items={languages}
          defaultSelectedKeys={[language]}
          onSelect={changeLocale}
        >
          <span className={`${prefixCls}-actionbar-action`}>
            <GlobalOutlined />
          </span>
        </DropdownMenu>
      </div>
    </Layout.Header>
  );
};

export default Header;
