import React, { FC, useContext, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Popover, Checkbox, Button } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SettingOutlined } from '@ant-design/icons';
import { upperWords, snake } from '@/utils/string';
import { ToolProps } from '../toolbar/interface';
import IconButton from '../icon-button';
import ListContext, { NormalizeColumnsType } from '../list/context';
import { columnsGroup, everyVisible, setColumnsVisible, resetColumnsVisible, convertFixedToNumber } from './utils';
import Picker from './picker';
import { Key, ColumnType, FixedType } from './interface';
import './index.less';

export { Key, ColumnType };

export type ChangeEventHandler = (columns: ColumnType[]) => void;

const ColumnSelect: FC<ToolProps> = (
  {
    icon = <SettingOutlined />,
    title,
  },
) => {
  const intl = useIntl();
  const { columns, onColumnsChange } = useContext(ListContext);
  const visible = everyVisible(columns, true);
  const group = columnsGroup(columns);

  // Component Style
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('column-tool');

  function onCheckAll(e: CheckboxChangeEvent) {
    onColumnsChange(setColumnsVisible(columns, e.target.checked) as NormalizeColumnsType);
  }

  function onReset() {
    onColumnsChange(resetColumnsVisible(columns) as NormalizeColumnsType);
  }

  function onFixed(key: Key, fixed: FixedType) {
    const cols = columns.map(column => (column.key === key ? { ...column, fixed } : column))
      .sort((a, b) => convertFixedToNumber(a.fixed) - convertFixedToNumber(b.fixed));

    onColumnsChange(cols as NormalizeColumnsType);
  }

  function onChange(columns: ColumnType[]) {
    const { fixed } = columns[0];

    switch (fixed) {
      case 'left':
        columns.push(...group.unfixed, ...group.rightFixed);
        break;
      case 'right':
        columns.unshift(...group.leftFixed, ...group.unfixed);
        break;
      default:
        columns.unshift(...group.leftFixed);
        columns.push(...group.rightFixed);
        break;
    }

    onColumnsChange(columns as NormalizeColumnsType);
  }

  function renderGroup(group: Record<string, ColumnType[]>) {
    return Object.keys(group)
      .filter(key => group[key].length > 0)
      .map((key, _, keys) => (
        <Fragment key={key}>
          {keys.length > 1 && (
            <span className={`${prefixCls}-group-title`}>
              {intl.formatMessage({ id: upperWords(snake(key, ' ')) })}
            </span>
          )}
          <Picker columns={group[key]} onFixed={onFixed} onChange={onChange} />
        </Fragment>
      ));
  }

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      arrowPointAtCenter
      title={(
        <div className={`${prefixCls}-title`}>
          <Checkbox
            checked={visible === true}
            indeterminate={visible === null}
            onChange={onCheckAll}
          >
            {intl.formatMessage({ id: 'Column Display' })}
          </Checkbox>
          <Button type="link" onClick={onReset}>
            {intl.formatMessage({ id: 'Reset' })}
          </Button>
        </div>
      )}
      content={(
        <div className={`${prefixCls}-group`}>
          {renderGroup(group)}
        </div>
      )}
    >
      <IconButton
        icon={icon}
        title={title || intl.formatMessage({ id: 'Setting Column' })}
      />
    </Popover>
  );
};

export default ColumnSelect;
