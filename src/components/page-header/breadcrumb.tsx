import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { normalizeIcon } from '../icon';

const { Item } = Breadcrumb;

function isInvalidRoutes(routes: IMenu[]) {
  return routes.length < 1
    || (routes.length === 1 && routes[0].url === '/');
}

const renderBreadcrumb = (routes: IMenu[], withIcon?: boolean) => {
  if (isInvalidRoutes(routes)) return null;

  const itemRender = (route: IMenu, i: number) => {
    const { id, icon, name, url } = route;
    const children = (
      <>
        {withIcon && normalizeIcon(icon)}
        <FormattedMessage id={name} />
      </>
    );

    return (
      <Item key={id}>
        {i < routes.length - 1
          ? <Link to={url}>{children}</Link>
          : children}
      </Item>
    );
  };

  return (
    <Breadcrumb>
      <Item key="home">
        {withIcon && <HomeOutlined /> }
        <Link to="/">
          <FormattedMessage id="Home" />
        </Link>
      </Item>
      {routes.map(itemRender)}
    </Breadcrumb>
  );
};

export default renderBreadcrumb;
