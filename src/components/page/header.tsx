import React from 'react';
import { Layout, Spin, Avatar } from 'antd';
import { GlobalOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons';
import { SelectParam } from 'antd/lib/menu';
import classNames from 'classnames';
import DropdownMenu from '../dropdown-menu';
import { setLocale } from '@/utils/locale';
import { renderMenus } from '@/utils/menu';
import { connect } from 'react-redux';

const languages: MenuItem[] = [
  {
    key: 'zh-CN',
    children: '简体中文',
  },
  {
    key: 'en',
    children: "English"
  }
];

const userMenus: MenuItem[] = [
  {
    key: 'settings',
    children: (
      <>
        <SettingOutlined />
        <span>个人设置</span>
      </>
    ),
  },
  {
    key: 'logout',
    children: (
      <>
        <PoweroffOutlined />
        <span>退出登录</span>
      </>
    )
  }
];

interface PageHeaderProps {
  user?: IUser;
  menus?: IMenu[];
  theme?: 'light' | 'dark';
}

const Header = ({ user, menus, theme, ...props }: PageHeaderProps) => {

  const handleChangeLocale = ({ key }: SelectParam) => {
    // setLocale(key);
  };

  const cls = classNames({
    'header-dark': theme === 'dark'
  });

  return (
    <Layout.Header className={cls}>
      {menus ? (
        <>
          <div className="logo" />
          <div className="header-menu">
            {renderMenus(menus, { mode: 'horizontal', theme })}
          </div>
        </>
      ) : (
        <div className="header-left">
          <MenuFoldOutlined />
        </div>
      )}
      <div className="actionbar">
        {user ? (
          <DropdownMenu key="user" dataSource={userMenus}>
            <span className="actionbar-action">
              <Avatar src={user.avatar} alt={user.name} />
              <span className="nickname">{user.name}</span>
            </span>
          </DropdownMenu>
        ) : (
          <span className="actionbar-action">
            <Spin />
          </span>  
        )}
        <DropdownMenu key="language" dataSource={languages} onSelect={handleChangeLocale}>
          <span className="actionbar-action">
            <GlobalOutlined />
          </span>
        </DropdownMenu>
      </div>
    </Layout.Header>
  );
};

export default Header
