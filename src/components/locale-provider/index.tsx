import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import Loadable from '../loadable/locale';

interface LocaleProviderProps extends Omit<ConfigProviderProps, 'locale' | 'form'> {
  locale: string;
  // Language files. path relative to @/locales
  files?: string[]; 
}

const LocaleProvider = ({ locale, files, children, ...props }: LocaleProviderProps) => {
  return (
    <Loadable paths={files || [locale]}>
      {({ antd, validateMessages, ...messages }: ILocale) => {
        const intl = <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>

        if (!antd || !validateMessages) {
          return intl;
        }

        return (
          <ConfigProvider 
            {...props} 
            locale={antd} 
            form={{ validateMessages }}
          >
            {intl}
          </ConfigProvider>
        );
      }}
    </Loadable>
  );
}

export default LocaleProvider;
