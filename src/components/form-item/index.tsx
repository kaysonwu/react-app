import React, { FC, useState, useContext } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import Item, { FormItemProps } from 'antd/lib/form/FormItem';
import { ConfigContext } from 'antd/lib/config-provider';
import { studly } from '@/utils/string';
import './index.less';

function isInput(el: HTMLElement) {
  const { tagName } = el;

  if (tagName === 'INPUT') {
    return ['text', 'password'].includes((el as HTMLInputElement).type);
  }

  if (tagName === 'TEXTAREA') {
    return true;
  }

  return false;
}

interface Props extends FormItemProps {
  bordered?: boolean;
}

const FormItem: FC<Props> = (
  {
    bordered = true,
    noStyle,
    className: customizeClassName,
    ...props
  },
) => {
  const { formatMessage } = useIntl();
  const [focused, setFocused] = useState(false);
  const { getPrefixCls } = useContext(ConfigContext);
  let { name, label } = props;

  const prefix = getPrefixCls('form-item');
  const className = classNames(customizeClassName, {
    [`${prefix}-bordered`]: bordered,
    [`${prefix}-focused`]: focused,
  });

  if (typeof name === 'string'
    && name.includes('.')
  ) {
    name = name.split('.');
  }

  if (!noStyle && !label && name) {
    label = formatMessage({ id: studly(name as string) });
  }

  return (
    <Item
      {...props}
      name={name}
      label={label}
      noStyle={noStyle}
      className={className}
      // @ts-ignore
      onFocus={e => isInput(e.target) && setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default FormItem;
