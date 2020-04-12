// @reference rc-field-form
type ValidateMessage = string | (() => string);

// @reference rc-field-form
interface ValidateMessages {
    default?: ValidateMessage;
    required?: ValidateMessage;
    enum?: ValidateMessage;
    whitespace?: ValidateMessage;
    date?: {
        format?: ValidateMessage;
        parse?: ValidateMessage;
        invalid?: ValidateMessage;
    };
    types?: {
        string?: ValidateMessage;
        method?: ValidateMessage;
        array?: ValidateMessage;
        object?: ValidateMessage;
        number?: ValidateMessage;
        date?: ValidateMessage;
        boolean?: ValidateMessage;
        integer?: ValidateMessage;
        float?: ValidateMessage;
        regexp?: ValidateMessage;
        email?: ValidateMessage;
        url?: ValidateMessage;
        hex?: ValidateMessage;
    };
    string?: {
        len?: ValidateMessage;
        min?: ValidateMessage;
        max?: ValidateMessage;
        range?: ValidateMessage;
    };
    number?: {
        len?: ValidateMessage;
        min?: ValidateMessage;
        max?: ValidateMessage;
        range?: ValidateMessage;
    };
    array?: {
        len?: ValidateMessage;
        min?: ValidateMessage;
        max?: ValidateMessage;
        range?: ValidateMessage;
    };
    pattern?: {
        mismatch?: ValidateMessage;
    };
}

type PageLocale = Record<string, any>;

interface ILocale extends PageLocale {

  /**
   * Antd component language pack.
   */
  antd?: any;
}
