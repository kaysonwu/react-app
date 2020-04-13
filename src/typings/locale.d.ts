interface ILocale {

  [key: string]: any;

  /**
   * Antd component language pack.
   * 
   * @example import zh_CN from antd/lib/locale-provider/zh_CN
   */
  antd?: import('antd/lib/locale-provider').Locale;
}
