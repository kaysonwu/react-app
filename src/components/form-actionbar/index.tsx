import React, { useContext, CSSProperties, MouseEvent, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Button, Dropdown, Menu } from 'antd';
import { DeleteOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { ConfigContext } from 'antd/lib/config-provider';
import { ClickParam } from 'antd/lib/menu';
import './index.less';
import IconButton from '../icon-button';

const { Item } = Menu;

interface FormActionBarProps {
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  onSubmit?: (e: MouseEvent<HTMLElement> | ClickParam) => void;
  onCancel?: MouseEventHandler<HTMLElement>;
}

function FormActionBar(props: FormActionBarProps) {
  const { className, style, loading, onCancel, onSubmit } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('form-actionbar');
  const intl = useIntl();

  return (
    <div 
      className={classNames(prefixCls, className)}
      style={style}
    >
      <div className={`${prefixCls}-left`}>
        <IconButton 
          danger
          title={intl.formatMessage({ id: 'Delete' })} 
          icon={<DeleteOutlined />}  
        />
      </div>
      <div className={`${prefixCls}-right`}>
        {onCancel && (
          <Button onClick={onCancel}>
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>
        )}
        <Dropdown.Button
          type="primary"
          trigger={['click']}
          icon={<DownOutlined />}
          overlay={(
            <Menu onClick={onSubmit}>
              <Item key="submit">{intl.formatMessage({ id: 'Submit And Continue' })}</Item>    
            </Menu>
          )}
          className={loading ? getPrefixCls('dropdown-button-loading') : undefined}
          onClick={onSubmit}
        >
          {loading && <LoadingOutlined />}
          {intl.formatMessage({ id: 'Submit' })}
        </Dropdown.Button>
      </div>
    </div>
  );
}

export default FormActionBar;
