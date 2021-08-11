import React, { FC } from 'react';
import Dayjs from 'dayjs';
import { createIntlCache, createIntl, RawIntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/lib/config-provider';
import { injectionIntl } from '@/utils/locale';
import Loadable from '../loadable/locale';

interface LocaleProviderProps extends Omit<ConfigProviderProps, 'locale' | 'form'> {
  /**
   * Indicate the current locale.
   */
  locale: string;

  /**
   * Indicate the locale language files path. path relative to @/locales.
   */
  files?: string[];
}

const cache = createIntlCache();

const LocaleProvider: FC<LocaleProviderProps> = ({ locale, files, children, ...props }) => (
  <Loadable paths={files || [locale]}>
    {({ antd, validateMessages, dayjs, ...messages }) => {
      const intl = createIntl({ locale, messages }, cache);
      const provider = <RawIntlProvider value={intl}>{children}</RawIntlProvider>;

      injectionIntl(intl);

      if (dayjs) {
        Dayjs.locale(dayjs);
      }

      if (!antd) {
        return provider;
      }

      return (
        <ConfigProvider {...props} locale={antd} form={{ validateMessages }}>
          {provider}
        </ConfigProvider>
      );
    }}
  </Loadable>
);

export default LocaleProvider;
