import React from 'react';
import { useIntl } from 'react-intl';
import { Popover, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import { SettingOutlined } from '@ant-design/icons';
import IconButton from '../icon-button';
import ColumnGroup, { DragItem } from './group';
import { splitColumns, isSelected, closestColumn, selectColumn, setColumnsSelectd, resetColumnsState } from './utils';
import { Key, ColumnType, FixedType } from './interface';
import './index.less';

export { Key, ColumnType };

export type ChangeEventHandler = (columns: ColumnType[]) => void;

interface ColumnSettingProps {
  columns: ColumnType[];
  onChange: ChangeEventHandler;
}

export default ({ columns, onChange }: ColumnSettingProps) => {
  const groups = splitColumns(columns);
  const showTitle = groups.filter(columns => columns.length > 0).length > 1;

  const checked = columns.every(column => column.selected);
  const indeterminate = !checked && columns.some(column => isSelected(column));

  const intl = useIntl();

  const handleDrop = ({ index: from, extra }: DragItem, { index: to }: DragItem) => {
    const cols = [...columns];
    const node = closestColumn(cols, extra)?.children || cols;
    const swap = node[from];
    
    node[from] = node[to]
    node[to] = swap;

    onChange(cols);
  }

  const handleFixed = (key: Key, fixed: FixedType) => {
    const cols = [...columns];
    const index = cols.findIndex(column => column.key === key);

    cols[index] = {...cols[index], fixed };

    onChange(cols);
  }

  const handleChange = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;

    onChange(selectColumn(columns, value, checked));
  }

  const renderGroup = (id: string, columns: ColumnType[], prefixCls: string, showTitle: boolean) => {
    return columns.length > 0 && (
      <ColumnGroup 
        key={id}
        columns={columns}
        prefixCls={prefixCls}
        title={showTitle && intl.formatMessage({ id })}
        onDrop={handleDrop}
        onFixed={handleFixed}
        onChange={handleChange}
      />
    );  
  };

  const handleCheckedAll = (e: CheckboxChangeEvent) => {
    onChange(setColumnsSelectd(columns, e.target.checked));
  }

  const handleReset = () => {
    onChange(resetColumnsState(columns));
  }

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const prefixCls = getPrefixCls('column-select');
        const listCls = `${prefixCls}-list`;

        return (
          <Popover
            trigger="click"
            placement="bottomRight"
            arrowPointAtCenter
            title={(
              <div className={`${prefixCls}-title`}>
                <Checkbox checked={checked} indeterminate={indeterminate} onChange={handleCheckedAll}>
                  {intl.formatMessage({ id: 'Column Display' })}
                </Checkbox>
                <a onClick={handleReset}>
                  {intl.formatMessage({ id: 'Reset' })}
                </a>
              </div>
            )}
            content={(
              <div className={listCls}>
                {renderGroup('Left Fixed', groups[0], listCls, showTitle)} 
                {renderGroup('Unfixed', groups[1], listCls, showTitle)}
                {renderGroup('Right Fixed', groups[2], listCls, showTitle)}
              </div>
            )}
          >
            <IconButton 
              icon={<SettingOutlined />}
              title={intl.formatMessage({ id: 'Setting Column' })}
            />
          </Popover>
        );
      }}
    </ConfigConsumer>  
  );
}
