import React, { FocusEvent, useState, useContext } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import Item, { FormItemProps } from 'antd/lib/form/FormItem';
import { ConfigContext } from 'antd/lib/config-provider';
import { studly } from '@/utils/string';
import './index.less';

function isInput(el: HTMLElement) {
  const { tagName } = el;

  if (tagName === 'INPUT') {
    return ~['text', 'password'].indexOf((el as HTMLInputElement).type);
  }

  if (tagName === 'TEXTAREA') {
    return true;
  }

  return false;
}

interface Props extends FormItemProps {
  bordered?: boolean;
}

function FormItem(props: Props) {
  const [focused, setFocused] = useState(false);
  const { getPrefixCls } = useContext(ConfigContext);
  let { name, label, bordered = true } = props;

  const prefix = getPrefixCls('form-item');
  const cls = classNames({
    [`${prefix}-bordered`]: bordered,
    [`${prefix}-focused`]: focused,
  });

  if (typeof name === 'string'
    && ~name.indexOf('.')
  ) {
    name = name.split('.');
  }
 
  if (!label && name) {
    label = useIntl().formatMessage({ id: studly(name as string) });
  }

  return (
    <Item 
      {...props} 
      name={name} 
      label={label}
      className={cls}
      // @ts-ignore
      onFocus={(e: FocusEvent) => isInput(e.target) && setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export default FormItem;
