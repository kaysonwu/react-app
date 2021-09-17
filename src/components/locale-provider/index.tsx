import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import Dayjs from 'dayjs';
import { RawIntlProvider, createIntl, createIntlCache } from 'react-intl';
import { Locale } from '@/components/loadable';
import { injectionIntl } from '@/utils/locale';
import type { ConfigProviderProps } from 'antd/lib/config-provider';

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
  <Locale paths={files || [locale]}>
    {({ antd, dayjs, ...messages }) => {
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
        <ConfigProvider {...props} locale={antd}>
          {provider}
        </ConfigProvider>
      );
    }}
  </Locale>
);

export default LocaleProvider;
