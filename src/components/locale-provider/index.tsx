import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import Loadable from '../loadable/locale';

interface LocaleProviderProps extends Omit<ConfigProviderProps, 'locale' | 'form'> {
  locale: string;
  // Language files. path relative to @/locales
  files?: string[];
}

const LocaleProvider: FC<LocaleProviderProps> = ({ locale, files, children, ...props }) => (
  <Loadable paths={files || [locale]}>
    {({ antd, validateMessages, ...messages }) => {
      const intl = <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>;

      if (!antd) {
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

export default LocaleProvider;
