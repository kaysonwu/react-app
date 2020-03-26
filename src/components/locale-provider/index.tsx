import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import Loadable from './loadable';

interface LocaleProviderProps extends Omit<ConfigProviderProps, 'locale'> {
  locale: string;
  // Language files. path relative to @/locales
  files?: string[]; 
}

const LocaleProvider = ({ locale, files, children, ...props }: LocaleProviderProps) => {
  return (
    <Loadable paths={files || [locale]}>
      {({ antd, ...messages }: any) => {
        const intl = <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>
        return antd ? <ConfigProvider {...props} locale={antd}>{intl}</ConfigProvider> : intl;
      }}
    </Loadable>
  );
}

export default LocaleProvider;
