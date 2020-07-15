import React, { CSSProperties, FC, useState, useContext, useEffect } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Layout, Drawer } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import { ConfigContext } from 'antd/lib/config-provider';
import { useToggle } from '@/hooks';
import { getTheme } from '@/utils/theme';
import { normalizeIcon } from '../icon';
import AppContext from '../application/context';
import Header from './header';
import Sider from './sider';
import Footer from './footer';
import './basic.less';

interface PageProps {
  className?: string;
  style?: CSSProperties;
}

const Basic: FC<PageProps> = ({ children, className: customizeClassName, style }) => {
  const [collapsed, { toggle: onCollapse }] = useToggle(false, true);
  const { isMobile, routes, state: { user, menus, links }, getPageTitle } = useContext(AppContext);
  const [theme, setTheme] = useState(() => getTheme({
    layout: 'top',
    style: 'light-dark',
    color: '#1890ff',
    contentWidth: true,
    fixedHeader: true,
  }));

  const logo = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
  const { formatMessage } = useIntl();

  // Style
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout-basic');
  const { layout, colorWeak, style: themeStyle, fixedHeader, fixSiderbar } = theme;
  const headTheme = themeStyle === 'light' || themeStyle === 'light-dark' ? 'light' : 'dark';
  const siderTheme = themeStyle === 'dark' || themeStyle === 'light-dark' ? 'dark' : 'light';
  const className = classNames(prefixCls, customizeClassName, {
    [`${prefixCls}-color-weak`]: colorWeak,
    [`${prefixCls}-fixed-header`]: fixedHeader,
    [`${prefixCls}-fixed-siderbar`]: fixSiderbar,
  });

  const title = getPageTitle();
  const selectedKeys = routes.map(route => String(route.id));

  useEffect(() => {
    const node = document.getElementById('app-loading');

    if (node) {
      node.parentNode!.removeChild(node);
      document.getElementById('loading-style')!.remove();
    }
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const childrenNode = (
    <>
      {children}
      <Footer
        links={links}
        copyright={(
          <>
            Copyright
            <CopyrightOutlined />
            {new Date().getFullYear()}
            <a href="https://github.com/kaysonwu/react-app" target="_blank" rel="noopener noreferrer">React App</a>
            All Rights Reserved.
          </>
        )}
        prefixCls={prefixCls}
      />
    </>
  );

  if (isMobile) {
    return (
      <Layout hasSider={false} className={className} style={style}>
        <Header
          logo={logo}
          user={user}
          collapsed={collapsed}
          theme={headTheme}
          prefixCls={prefixCls}
          onCollapse={onCollapse}
        />
        {childrenNode}
        <Drawer
          width={200}
          placement="left"
          closable={false}
          visible={collapsed}
          bodyStyle={{ padding: 0 }}
          onClose={onCollapse}
        >
          <Sider
            mode="inline"
            collapsed={false}
            logo={logo}
            menus={menus}
            theme={siderTheme}
            defaultSelectedKeys={selectedKeys}
            prefixCls={prefixCls}
          />
        </Drawer>
      </Layout>
    );
  }

  if (layout === 'sider') {
    return (
      <Layout className={className} style={style}>
        <Sider
          mode="inline"
          logo={logo}
          menus={menus}
          collapsed={collapsed}
          theme={siderTheme}
          defaultSelectedKeys={selectedKeys}
          prefixCls={prefixCls}
        />
        <Layout>
          <Header
            user={user}
            theme={headTheme}
            collapsed={collapsed}
            prefixCls={prefixCls}
            onCollapse={onCollapse}
          />
          {childrenNode}
        </Layout>
      </Layout>
    );
  }

  if (layout === 'top-sider') {
    const { children: submenus = [] } = routes[0];
    const page = <Layout>{childrenNode}</Layout>;

    return (
      <Layout className={className} style={style}>
        <Header
          logo={logo}
          menus={menus}
          depth={1}
          user={user}
          theme={headTheme}
          defaultSelectedKeys={selectedKeys}
          prefixCls={prefixCls}
        />
        {submenus.length > 0
          ? (
            <Layout>
              <Sider
                mode="inline"
                menus={submenus}
                theme={siderTheme}
                defaultSelectedKeys={selectedKeys}
                prefixCls={prefixCls}
              />
              {page}
            </Layout>
          )
          : page}
      </Layout>
    );
  }

  if (layout === 'sider2') {
    const { icon, name, subtitle, children: submenus } = routes[0];
    const id = subtitle || name;

    return (
      <Layout className={className} style={style}>
        <Sider
          collapsed
          logo={logo}
          menus={menus}
          depth={1}
          theme={siderTheme}
          defaultSelectedKeys={selectedKeys}
          prefixCls={prefixCls}
        />
        {submenus?.length && (
          <Sider
            mode="inline"
            title={(
              <>
                {normalizeIcon(icon)}
                <span>{formatMessage({ id })}</span>
              </>
            )}
            collapsed={collapsed}
            collapsedWidth={0}
            menus={submenus}
            theme={headTheme}
            defaultSelectedKeys={selectedKeys}
            prefixCls={prefixCls}
          />
        )}
        <Layout>
          <Header
            user={user}
            theme={headTheme}
            collapsed={collapsed}
            prefixCls={prefixCls}
            onCollapse={onCollapse}
          />
          {childrenNode}
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout className={className} style={style}>
      <Header
        logo={logo}
        menus={menus}
        user={user}
        theme={headTheme}
        defaultSelectedKeys={selectedKeys}
        prefixCls={prefixCls}
      />
      {childrenNode}
    </Layout>
  );
};

export default Basic;
