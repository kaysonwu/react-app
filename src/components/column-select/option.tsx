import React, { CSSProperties } from 'react';
import { Tooltip } from 'antd';
import { PushpinOutlined, StopOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { FixedType } from './interface';

interface OptionProps {
  value: any;
  fixed?: FixedType;
  className?: string;
  style?: CSSProperties;
  onFixed?: (value: any, to: FixedType) => void;
}

export default ({ value, fixed, className, style, onFixed }: OptionProps) => {
  const intl = useIntl();
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (onFixed) {
      const fixed = e.currentTarget.getAttribute('data-fixed') ?? false;
      onFixed(value, fixed as FixedType);
    }
  }

  return (
    <span className={className} style={style}>
      {(!fixed || fixed !== 'left') && (
        <Tooltip title={intl.formatMessage({ id: 'Pin Left' })}>
          <PushpinOutlined data-fixed="left" onClick={handleClick} />
        </Tooltip>
      )}
      {fixed && (
        <Tooltip title={intl.formatMessage({ id: 'Unpin' })}>
          <StopOutlined onClick={handleClick} />
        </Tooltip>
      )}
      {(!fixed || fixed !== 'right') && (
        <Tooltip title={intl.formatMessage({ id: 'Pin Right' })}>
          <PushpinOutlined data-fixed="right" onClick={handleClick} />
        </Tooltip>
      )}
    </span>
  );
}
