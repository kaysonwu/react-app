import React, { CSSProperties, FC } from 'react';
import { Tooltip } from 'antd';
import { PushpinOutlined, StopOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { FixedType } from './interface';

export interface OptionProps {
  value: unknown;
  fixed?: FixedType;
  className?: string;
  style?: CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFixed?: (value: any, to: FixedType) => void;
}

const Option: FC<OptionProps> = ({ value, fixed, className, style, onFixed }) => {
  const { formatMessage } = useIntl();

  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    if (onFixed) {
      const fixed = e.currentTarget.getAttribute('data-fixed') ?? false;
      onFixed(value, fixed as FixedType);
    }
  }

  return (
    <span className={className} style={style}>
      {(!fixed || fixed !== 'left') && (
        <Tooltip title={formatMessage({ id: 'Pin Left' })}>
          <PushpinOutlined data-fixed="left" onClick={onClick} />
        </Tooltip>
      )}
      {fixed && (
        <Tooltip title={formatMessage({ id: 'Unpin' })}>
          <StopOutlined onClick={onClick} />
        </Tooltip>
      )}
      {(!fixed || fixed !== 'right') && (
        <Tooltip title={formatMessage({ id: 'Pin Right' })}>
          <PushpinOutlined data-fixed="right" onClick={onClick} />
        </Tooltip>
      )}
    </span>
  );
};

export default Option;
