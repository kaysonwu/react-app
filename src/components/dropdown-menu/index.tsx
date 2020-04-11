import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import { MenuProps } from 'antd/lib/menu';

interface DropdownMenuProps extends Omit<DropDownProps, 'overlay'>, Pick<MenuProps, 'theme' | 'onSelect'> {
  children: React.ReactNode;
  dataSource: MenuItem[];
}

export default ({ dataSource, onSelect, theme, ...props }: DropdownMenuProps) => {
  return (
    <Dropdown 
      placement="bottomCenter"
      {...props} 
      overlay={
        <Menu  
          theme={theme}
          onSelect={onSelect}
          selectable={onSelect !== undefined}
        >
          {dataSource.map(
            ({ divider, ...props }) => divider ? (
              <Menu.Divider key={props.key} />
            ) : (
              <Menu.Item {...props} />
            )
          )}
        </Menu>
      }
    />
  );
};
