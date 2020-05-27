import React, { ReactNode, FC } from 'react';
import { Tooltip, Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { normalizeIcon } from '../icon';

export interface IconButtonProps extends Omit<ButtonProps, 'title'> {
  title: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({ title, icon, ...props }) => (
  <Tooltip title={title}>
    <Button
      {...props}
      icon={normalizeIcon(icon)}
    />
  </Tooltip>
);

export default IconButton;
