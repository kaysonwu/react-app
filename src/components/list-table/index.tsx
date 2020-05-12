import React, { useState, useContext } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns';
import Toolbar, { ListToolbarProps } from '../list-toolbar';
import { ColumnsType, ColumnsTypeEx, ColumnProps, ColumnGroupProps } from './interface';
import { normalizeColumns, getSelectedKeysFromCache, getSelectedColumns, saveSelectedKey } from './utils';

interface ListTableProps<T> extends Omit<TableProps<T>, 'columns'>, Omit<ListToolbarProps, 'columns'> {
  columns?: ColumnsType[];
  cacheKey?: string;
}

function ListTable<T extends object = any>(props: ListTableProps<T>) {
  const {
    className,
    style,
    columns: cols,
    children,
    cacheKey,
    onCreate,
    onExport,
    onImport,
    ...tableProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('list-table');
  const intl = useIntl();

  const [columns, setColumns] = useState(() => normalizeColumns(
    cols || convertChildrenToColumns(children) as any,
    intl,
    cacheKey && getSelectedKeysFromCache(cacheKey),
  ));

  
  const handleColumnsChange = (columns: ColumnsTypeEx) => {
    setColumns(columns);

    if (cacheKey) {
      saveSelectedKey(columns, cacheKey);
    }
  }
      
  return (
    <div 
      style={style}
      className={classNames(prefixCls, className)} 
    >
      <Toolbar 
        columns={columns}
        onCreate={onCreate} 
        onExport={onExport} 
        onImport={onImport}
        onColumnsChange={handleColumnsChange}
      />   
      <Table<T> 
        {...tableProps} 
        columns={getSelectedColumns(columns)} 
      />
    </div>
  );
}

ListTable.Column = Table.Column as <T>(props: ColumnProps<T>) => null;
ListTable.ColumnGroup = Table.ColumnGroup as <T>(props: ColumnGroupProps<T>) => null;

export default ListTable;
