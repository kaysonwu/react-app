import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import Loadable from './loadable';

interface LocaleProviderProps extends Omit<ConfigProviderProps, 'locale'> {
  locale: string;
  files?: string[]
}

const LocaleProvider = ({ locale, files, children, ...props }: LocaleProviderProps) => {
  const paths = (files || ['index']).map(file => (file.indexOf('/') !== -1 ? file : `${locale}/${file}`));
  return (
    <Loadable paths={paths}>
      {({ antd, ...messages }) => {
        const intl = <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>
        return antd ? <ConfigProvider {...props} locale={antd}>{intl}</ConfigProvider> : intl;
      }}
    </Loadable>
  );
}

export default LocaleProvider;
