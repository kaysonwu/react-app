import React, { ReactNode, ReactElement, useState, useContext } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Table as TableBase } from 'antd';
import { TableProps as Props } from 'antd/lib/table';
import { ConfigContext } from 'antd/lib/config-provider';
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns';
import { ColumnsType, ColumnProps, ColumnGroupProps, NormalizeColumnsType } from './interface';
import { normalizeColumns, filterInvisible } from './utils';
import ListContext from './context';
import './table.less';

export interface TableProps<T> extends Props<T> {
  columns?: ColumnsType<T>;
  toolbar?: ReactNode;
}

const InternalTable = <T extends object = {}>(
  {
    toolbar,
    children,
    columns: customizeColumns,
    className: customizeClassName,
    style,
    onChange,
    ...props
  }: TableProps<T>,
): ReactElement => {
  const intl = useIntl();
  const [columns, setColumns] = useState(() => normalizeColumns<T>(
    customizeColumns || convertChildrenToColumns<T>(children),
    intl,
  ));

  // Component Style
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('list');
  const className = classNames(prefixCls, customizeClassName);

  function onColumnsChange(columns: NormalizeColumnsType<T>) {
    setColumns(columns);
  }

  return (
    <div className={className} style={style}>
      <ListContext.Provider value={{ columns, onColumnsChange }}>
        {toolbar}
      </ListContext.Provider>
      <TableBase<T>
        {...props}
        columns={filterInvisible<T>(columns)}
        className={`${prefixCls}-table`}
        onChange={onChange ? (...params) => onChange(...params) : undefined}
      />
    </div>
  );
};

type InternalTable = typeof InternalTable;
interface Table extends InternalTable {
  Column: <T = unknown>(props: ColumnProps<T>) => null;
  ColumnGroup: <T = unknown>(props: ColumnGroupProps<T>) => null;
}

const Table = InternalTable as Table;

Table.Column = TableBase.Column;
Table.ColumnGroup = TableBase.ColumnGroup;

export default Table;
