import { everyVisible, isDefaultVisible } from '../list/utils';
import { ColumnType, Key, FixedType } from './interface';

export { everyVisible };

export function columnsGroup(columns: ColumnType[]) {
  const leftFixed: ColumnType[] = [];
  const unfixed: ColumnType[] = [];
  const rightFixed: ColumnType[] = [];

  for (const column of columns) {
    switch (column.fixed) {
      case 'left':
        leftFixed.push(column);
        break;
      case 'right':
        rightFixed.push(column);
        break;
      default:
        unfixed.push(column);
        break;
    }
  }

  return { leftFixed, unfixed, rightFixed };
}

export function closestColumn(columns: ColumnType[], keys: Key[]): ColumnType | null {
  if (keys.length > 0) {
    for (const column of columns) {
      let index = keys.indexOf(column.key);

      if (index !== -1) {
        index += 1;

        if (index < keys.length - 1 && column.children) {
          return closestColumn(column.children, keys.slice(index));
        }

        return column;
      }
    }
  }

  return null;
}

export function setColumnsVisible(columns: ColumnType[], visible: boolean): ColumnType[] {
  return columns.map(column => {
    if (column.required) {
      return column;
    }

    let { children } = column;

    if (!children) {
      return { ...column, visible };
    }

    children = setColumnsVisible(children, visible);

    return { ...column, children, visible: everyVisible(children, visible) };
  });
}

export function setColumnVisible(
  columns: ColumnType[],
  keys: Key[],
  visible: boolean,
): ColumnType[] {
  return columns.map(column => {
    if (keys[0] !== column.key) {
      return column;
    }

    let { children } = column;

    if (!children) {
      return { ...column, visible };
    }

    const childrenKey = keys.slice(1);
    children = childrenKey.length > 0
      ? setColumnVisible(children, childrenKey, visible)
      : setColumnsVisible(children, visible);

    return { ...column, children, visible: everyVisible(children, visible) };
  });
}

export function resetColumnsVisible(columns: ColumnType[]): ColumnType[] {
  return columns.map(column => {
    if (!column.children) {
      return { ...column, visible: isDefaultVisible(column) };
    }

    const children = resetColumnsVisible(column.children);
    const visible = everyVisible(children, true);

    return { ...column, visible, children };
  });
}

export function convertFixedToNumber(fixed?: FixedType) {
  if (!fixed) {
    return 1;
  }

  return fixed === 'left' ? 0 : 2;
}
