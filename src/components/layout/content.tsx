import React, { ReactNode, FC, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import AppContext from '../application/context';
import PageHeader, { PageHeaderProps } from '../page-header';

interface ContentProps extends PageHeaderProps {
  description?: ReactNode;
  header?: ReactNode | false;
}

const Content: FC<ContentProps> = (
  {
    title,
    description,
    header,
    children,
    className,
    style,
    ...props
  },
) => {
  const { getPageTitle } = useContext(AppContext);

  useEffect(() => {
    if (title) {
      document.title = getPageTitle(title as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <Layout.Content
      className={className}
      style={style}
    >
      {header !== false && (
        <PageHeader
          key="PageHeader"
          title={title}
          {...props}
        >
          {description}
        </PageHeader>
      )}
      {children}
    </Layout.Content>
  );
};

export default Content;
