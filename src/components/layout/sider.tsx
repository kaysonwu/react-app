import React, { FC, ReactNode, MouseEventHandler } from 'react';
import { Layout } from 'antd';
import { SiderProps as Props } from 'antd/lib/layout';
import { MenuMode } from 'antd/lib/menu';
import Logo from './logo';
import Menu from './menu';

interface SiderProps extends Omit<Props, 'title'> {
  menus?: IMenu[];
  mode?: MenuMode;
  logo?: string;
  title?: ReactNode;
  depth?: number;
  defaultSelectedKeys?: string[];
  onClickLogo?: MouseEventHandler;
}

const Sider: FC<SiderProps> = (
  {
    logo,
    title,
    menus,
    mode,
    depth,
    theme,
    defaultSelectedKeys,
    prefixCls = '',
    onClickLogo,
    ...props
  },
) => (
  <Layout.Sider {...props} theme={theme} className={`${prefixCls}-sider`}>
    {logo && <Logo src={logo} onClick={onClickLogo} />}
    {title && (
      <div className={`${prefixCls}-sider-title`}>
        <h2>{title}</h2>
      </div>
    )}
    <Menu
      mode={mode}
      dataSource={menus}
      depth={depth}
      theme={theme}
      defaultSelectedKeys={defaultSelectedKeys}
    />
  </Layout.Sider>
);

export default Sider;
