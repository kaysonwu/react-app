import React, { ReactNode, useMemo } from 'react';
import { Tooltip, Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import Icon from '../icon';

interface Props extends Omit<ButtonProps, 'title'> {
  title: ReactNode;
}

export default ({ title, icon, ...props }: Props) => {
  const IconNode = useMemo(
    () => typeof icon === 'string' ? <Icon type={icon} /> : icon, 
    [icon],
  );

  return (
    <Tooltip title={title}>
      <Button icon={IconNode} {...props} />
    </Tooltip>
  );
};
