import React, { CSSProperties, FC, useContext, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Layout, Drawer, Spin } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import { ConfigContext } from 'antd/lib/config-provider';
import { useToggle } from '@/hooks';
import { normalizeIcon } from '../icon';
import { getPathRoutes } from './util';
import Context from './context';
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
  const { isMobile, theme, user, menus, links } = useSelector(
    ({ global }: ConnectState) => omit(global, ['loading']),
  );

  // TODO 移动到 model 里面去
  const logo = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

  const { formatMessage } = useIntl();
  const { getPrefixCls } = useContext(ConfigContext);

  const { pathname } = useLocation();
  const routes = useMemo(() => menus && getPathRoutes(menus, pathname), [menus, pathname])!;

  function getPageTitle(suffix?: string, customizeTitle?: string) {
    let title = customizeTitle;

    if (!title) {
      const name = routes[routes.length - 1]?.name;
      if (name) {
        title = formatMessage({ id: name });
      }
    }

    if (suffix) {
      return title ? `${title} - ${suffix}` : suffix;
    }

    return title!;
  }

  const selectedKeys = routes?.map(route => String(route.id));
  const title = routes && getPageTitle(formatMessage({ id: 'App Name' }));

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

  if (menus === undefined) {
    return <Spin />;
  }

  // Style
  const prefixCls = getPrefixCls('layout-basic');
  const { layout, colorWeak, style: themeStyle, fixedHeader, fixSiderbar } = theme;
  const headTheme = themeStyle === 'light' || themeStyle === 'light-dark' ? 'light' : 'dark';
  const siderTheme = themeStyle === 'dark' || themeStyle === 'light-dark' ? 'dark' : 'light';
  const className = classNames(prefixCls, customizeClassName, {
    [`${prefixCls}-color-weak`]: colorWeak,
    [`${prefixCls}-fixed-header`]: fixedHeader,
    [`${prefixCls}-fixed-siderbar`]: fixSiderbar,
  });

  const childrenNode = (
    <Context.Provider value={{ routes, getPageTitle }}>
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
    </Context.Provider>
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
