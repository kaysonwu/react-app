import React, { MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';
import { Row, Col, Button } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import { ConfigConsumer } from 'antd/lib/config-provider/context';
import ColumnSetting, { ColumnType, ChangeEventHandler } from '../column-select';
import IconButton from '../icon-button';
import './index.less';

export { ColumnType };

export interface ListToolbarProps {
  columns?: ColumnType[];
  onColumnsChange?: ChangeEventHandler;
  onCreate?: MouseEventHandler<HTMLElement>;
  onImport?: MouseEventHandler<HTMLElement>;
  onExport?: MouseEventHandler<HTMLElement>;
}

export default ({ columns, onCreate, onImport, onExport, onColumnsChange }: ListToolbarProps) => {
  const intl = useIntl();

  return (
    <ConfigConsumer>
      {({ getPrefixCls }) => {
        const prefix = getPrefixCls('list-toolbar');

        return (
          <Row className={prefix}>
            <Col span={12}>
              {onCreate && (
                <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
                  {intl.formatMessage({ id: 'New' })}
                </Button>
              )}
              {<IconButton title="Import" icon={<CloudUploadOutlined />} onClick={onImport} />}
              {<IconButton title="Export" icon={<DownloadOutlined />} onClick={onExport} />}
            </Col>
            <Col span={12}>
              <IconButton title="Import" icon={<FilterOutlined />} onClick={onImport} />
              {columns && <ColumnSetting columns={columns} onChange={onColumnsChange as ChangeEventHandler} />}
            </Col>
          </Row>
        );
      }}
    </ConfigConsumer>  
  );
}
