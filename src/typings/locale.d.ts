interface Locale {
  /**
   * Antd component language pack.
   *
   * @example import zh_CN from antd/lib/locale-provider/zh_CN
   */
  antd?: import('antd/lib/locale-provider').Locale;

  /**
   * Antd form component validate messages.
   */
  validateMessages?: import('rc-field-form/lib/interface').ValidateMessages;

  /**
   * Dayjs
   */
  dayjs?: import('dayjs/locale/*').Locale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
