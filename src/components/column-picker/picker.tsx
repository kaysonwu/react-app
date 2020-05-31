import React, { CSSProperties, FC, useContext } from 'react';
import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import backend from 'react-dnd-html5-backend';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ConfigContext } from 'antd/lib/config-provider';
import Drag, { DragItem } from '../drag';
import { closestColumn, setColumnVisible } from './utils';
import { ColumnType, Key } from './interface';
import Option, { OptionProps } from './option';
import './picker.less';

interface PickerProps extends Pick<OptionProps, 'onFixed'> {
  columns: ColumnType[];
  layout?: 'horizontal' | 'vertical';
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  onChange: (columns: ColumnType[]) => void;
}

const Picker: FC<PickerProps> = (
  {
    columns,
    layout = 'vertical',
    prefixCls: customizePrefixCls,
    className: customizeClassName,
    style,
    onChange,
    onFixed,
  },
) => {
  // Component Style
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('column-picker', customizePrefixCls);
  const className = classNames(prefixCls, customizeClassName, {
    [`${prefixCls}-vertical`]: layout === 'vertical',
    [`${prefixCls}-horizontal`]: layout === 'horizontal',
  });

  function onDrop({ index: from, extra }: DragItem, { index: to }: DragItem) {
    const sorted = [...columns];
    const node = closestColumn(sorted, extra as Key[])?.children || sorted;
    const swap = node[from];

    node[from] = node[to];
    node[to] = swap;

    onChange(sorted);
  }

  function onCheck(e: CheckboxChangeEvent) {
    const { checked, value } = e.target;
    onChange(setColumnVisible(columns, value, checked));
  }

  const renderColumns = (columns: ColumnType[], parentsKey: Key[] = [], depth = 0) => (
    <DndProvider backend={backend}>
      {columns.map((column, index) => {
        const { key, title, fixed, visible, required, children } = column;
        const keys = [...parentsKey, key];

        return (
          <Drag
            key={key}
            index={index}
            extra={parentsKey}
            type={`${fixed || 'unpin'}-column-${depth}`}
            className={`${prefixCls}-item`}
            onDrop={onDrop}
          >
            <Checkbox
              value={keys}
              checked={visible === true}
              indeterminate={visible === null}
              disabled={required}
              onChange={onCheck}
            >
              {title}
            </Checkbox>
            {depth === 0 && onFixed && (
              <Option
                value={key}
                fixed={fixed}
                className={`${prefixCls}-item-option`}
                onFixed={onFixed}
              />
            )}
            {children && (
              <span className={`${prefixCls}-item-children`}>
                {renderColumns(children, keys, depth + 1)}
              </span>
            )}
          </Drag>
        );
      })}
    </DndProvider>
  );

  return (
    <div className={className} style={style}>
      {renderColumns(columns)}
    </div>
  );
};

export default Picker;
