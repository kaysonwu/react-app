import React, { ReactNode, FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Layout } from 'antd';
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
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (title) {
      document.title = `${title} - ${formatMessage({ id: 'App Name' })}`;
    }
  }, [formatMessage, title]);

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
