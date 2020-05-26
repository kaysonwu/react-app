import React, { ReactNode, CSSProperties, FC, useState, useContext } from 'react';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider';
import AuthContext from '../auth/context';
import renderBreadcrumb from './breadcrumb';
import renderHeader, { HeaderProps } from './header';
import renderContent, { ContentProps } from './content';
import 'antd/lib/page-header/style/index.less';
import './index.less';

interface PageHeaderProps extends
Omit<HeaderProps, 'prefixCls' | 'direction'>,
Omit<ContentProps, 'prefixCls'> {
  ghost?: boolean;
  hideBreadcrumb?: boolean;
  showBreadcrumbIcon?: boolean;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const PageHeader: FC<PageHeaderProps> = props => {
  const {
    ghost = false,
    hideBreadcrumb,
    showBreadcrumbIcon,
    title: customizeTitle,
    links,
    extra,
    footer,
    children,
    style,
    className: customizeClassName,
    ...headerProps
  } = props;
  const { title, routes } = useContext(AuthContext);
  const breadcrumb = hideBreadcrumb ? null : renderBreadcrumb(routes, showBreadcrumbIcon);
  const [compact, updateCompact] = useState(false);
  const { getPrefixCls, pageHeader, direction } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('page-header');
  const className = classNames(prefixCls, customizeClassName, {
    'has-breadcrumb': breadcrumb,
    'has-footer': footer,
    [`${prefixCls}-ghost`]: pageHeader && 'ghost' in pageHeader ? pageHeader.ghost : ghost,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-compact`]: compact,
  });

  function onResize({ width }: { width: number }) {
    updateCompact(width < 768);
  }

  return (
    <ResizeObserver onResize={onResize}>
      <div className={className} style={style}>
        {breadcrumb}
        {renderHeader({ ...headerProps, prefixCls, title: customizeTitle || title, direction })}
        {renderContent({ prefixCls, links, extra, children })}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>
    </ResizeObserver>
  );
};

export default PageHeader;
