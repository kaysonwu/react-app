import { IntlShape } from 'react-intl';
import { studly } from '@/utils/string';
import { ColumnType, ColumnsType, ColumnsTypeEx, ColumnTypeEx, Key } from './interface';
import { isSelected, isDefaultSelected, computeParentState } from '../column-select/utils';

export function getSelectedKeysFromCache(key: string) {
  const keys = localStorage.getItem(key);
  return keys && JSON.parse(keys);
}

export function normalizeColumn(column: ColumnType, intl: IntlShape): ColumnType {
  let { dataIndex, key, title } = column;

  if (typeof dataIndex === 'string'
    && dataIndex.indexOf('.') !== -1
  ) {
    dataIndex = dataIndex.split('.');
  }

  if (!key) {
    key = Array.isArray(dataIndex) ? dataIndex.join(' ') : dataIndex;
  }
 
  if (title === undefined) {
    title = intl.formatMessage({ id: studly(key as string) });
  }

  return { ...column, title, key, dataIndex };
}

export function normalizeColumns(columns: ColumnsType, intl: IntlShape, selectedKeys?: Key[]): ColumnsTypeEx {
  return columns.map(column => {
    const col = normalizeColumn(column, intl) as any;

    if (col.children) {
      col.children = normalizeColumns(col.children, intl, selectedKeys);
      col.selected = computeParentState(col.children, true);
      col.required = (col.children as ColumnsTypeEx).every(column => column.required);
    } else {
      col.selected = selectedKeys ? selectedKeys.indexOf(col.key) !== -1 : isDefaultSelected(column as ColumnTypeEx);
    }

    return col;
  });  
}

export function getSelectedColumns(columns: ColumnsTypeEx): ColumnsTypeEx {
  return columns.filter(column => isSelected(column))
    .map(column => (column as any).children 
      ? { ...column, children: getSelectedColumns((column as any).children) } 
      : column
    );
}

function getSelectedKeys(columns: ColumnsTypeEx) {
  return columns.filter(column => isSelected(column))
    .reduce((keys, column) => {
      keys.push(column.key);

      if ((column as any).children) {
        keys.push(...getSelectedKeys((column as any).children));
      }

      return keys;
    }, [] as Key[]);
}

export function saveSelectedKey(columns: ColumnsTypeEx, key: string) {
  localStorage.setItem(key, JSON.stringify(getSelectedKeys(columns)));
}
