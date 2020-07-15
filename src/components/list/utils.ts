import { IntlShape } from 'react-intl';
import { studly } from '@/utils/string';
import { ColumnsType, ColumnType, ColumnGroupType, NormalizeColumnsType, NormalizeColumnType, NormalizeColumnGroupType } from './interface';

export function isDefaultVisible(column: { required?: boolean; defaultVisible?: boolean }) {
  return Boolean(column.required || column.defaultVisible);
}

export function everyVisible(columns: { visible: boolean | null }[], visible: boolean) {
  return columns.every(column => column.visible === visible) ? visible : null;
}

function shouldColumnUpdate<T>(record: T, prevRecord: T) {
  return record !== prevRecord;
}

function normalizeColumn<T>(column: ColumnType<T>, intl: IntlShape, parentVisible?: boolean) {
  let { dataIndex, key, title, shouldCellUpdate } = column as ColumnType<T>;
  // TODO 从缓存里面判断？
  const visible = parentVisible || isDefaultVisible(column);

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

  if (shouldCellUpdate === undefined) {
    shouldCellUpdate = shouldColumnUpdate;
  }

  return { ...column, key, dataIndex, title, shouldCellUpdate, visible } as NormalizeColumnType<T>;
}

function normalizeColumnGroup<T>(
  columnGroup: ColumnGroupType<T>,
  intl: IntlShape,
  parentVisible?: boolean,
) {
  let { children, title, required, defaultVisible: visible = parentVisible } = columnGroup;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  children = normalizeColumns<T>(children, intl, visible || required);

  if (title === undefined) {
    title = intl.formatMessage({ id: columnGroup.key });
  }

  if (required === undefined) {
    required = children.every(column => column.required);
  }

  if (visible === undefined) {
    // @ts-ignore
    visible = required || everyVisible(children as NormalizeColumnsType<T>, true);
  }

  return { ...columnGroup, title, required, visible, children } as NormalizeColumnGroupType<T>;
}

export function normalizeColumns<T = unknown>(
  columns: ColumnsType<T>,
  intl: IntlShape,
  parentVisible?: boolean,
) {
  return columns.map(column => (
    (column as ColumnGroupType<T>).children
      ? normalizeColumnGroup<T>(column as ColumnGroupType<T>, intl, parentVisible)
      : normalizeColumn<T>(column, intl, parentVisible)
  ));
}

export function filterInvisible<T = unknown>(
  columns: NormalizeColumnsType<T>,
): NormalizeColumnsType<T> {
  return columns.filter(column => column.visible !== false)
    .map(column => (
      column.visible !== null ? column : { ...column, children: filterInvisible(column.children) }
    ));
}
