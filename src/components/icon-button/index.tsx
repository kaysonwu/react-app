import React, { ReactNode } from 'react';
import { Tooltip, Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import Icon from '../icon';

interface Props extends Omit<ButtonProps, 'title'> {
  title: ReactNode;
}

function IconButton(props: Props) {
  const { title, icon, ...resetProps } = props;

  return (
    <Tooltip title={title}>
      <Button 
        {...resetProps} 
        icon={(
          typeof icon === 'string' 
            ? <Icon type={icon} />
            : icon
        )} 
      />
    </Tooltip>
  );
}

export default IconButton;
