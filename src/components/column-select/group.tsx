import React, { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import backend from 'react-dnd-html5-backend';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Drag, { DragItem } from '../drag';
import Option from './option';
import { Key, FixedType, ColumnType } from './interface';

export { DragItem };

interface ColumnGroupProps {
  columns: ColumnType[];
  prefixCls: string;
  title?: ReactNode;
  onDrop: (from: DragItem, to: DragItem) => void;
  onFixed: (index: number, fixed: FixedType) => void;
  onChange: (e: CheckboxChangeEvent) => void;
}

export default ({ columns, prefixCls, title, onDrop, onFixed, onChange }: ColumnGroupProps) => {
  const renderColumns = (columns: ColumnType[], group: number, parentsKey: Key[]) => {
    return columns.map((column, index) => {
      const { key, fixed, selected, title, children, required } = column;
      const keys = [...parentsKey, key];

      return (
        <Drag
          key={key}
          index={index}
          extra={parentsKey}
          type={`${fixed || 'unpin'}-column-${group}`}
          className={`${prefixCls}-item`}
          onDrop={onDrop}
        >
          <Checkbox
            value={keys}
            checked={selected === true}
            indeterminate={selected === null}
            disabled={required}
            onChange={onChange}
          >
            {title}
          </Checkbox>
          {group === 0 && (
            <Option 
              value={key} 
              fixed={fixed} 
              className={`${prefixCls}-item-option`}
              onFixed={onFixed}
            />
          )}
          {children && (
            <DndProvider backend={backend}>
              <span className={`${prefixCls}-item-children`}>
                {renderColumns(children, group + 1, keys)}
              </span>
            </DndProvider>
          )}
        </Drag>
      );
    });
  }

  return (
    <DndProvider backend={backend}>
      {title && (
        <span className={`${prefixCls}-title`}>
          {title}
        </span>
      )}
      {renderColumns(columns, 0, [])}
    </DndProvider>
  );
}
