import { ColumnType, Key } from './interface';

export function splitColumns(columns: ColumnType[]) {
  const left: ColumnType[] = [];
  const neither: ColumnType[] = [];
  const right: ColumnType[] = [];

  for (let column of columns) {
    switch (column.fixed) {
      case 'left':
        left.push(column);
        break;
      case 'right':
        right.push(column);
        break;  
      default:
        neither.push(column);
        break;  
    }
  }

  return [left, neither, right];
}

export function isSelected({ selected }: ColumnType) {
  return selected || selected === null;
}

export function closestColumn(columns: ColumnType[], keys: Key[]): ColumnType | null {
  if (keys.length < 1) return null;
  
  for (let column of columns) {
    let index = keys.indexOf(column.key);

    if (index === -1) continue;

    index += 1;

    if (index < keys.length && column.children) {
      return closestColumn(column.children, keys.slice(index));
    }

    return column;
  }

  return null;
}

export function computeParentState(children: ColumnType[], selected: boolean) {
  return children!.every(column => column.selected === selected) ? selected : null;
}

export function setColumnsSelectd(columns: ColumnType[], selected: boolean): ColumnType[] {
  return columns.map(column => {
    if (column.required) return column;

    let { children } = column;

    if (!children) {
      return { ...column, selected };
    }

    children = setColumnsSelectd(children, selected);

    return { ...column, children, selected: computeParentState(children, selected) }
  });
}

export function selectColumn(columns: ColumnType[], keys: Key[], selected: boolean): ColumnType[] {
  return columns.map(column => {
    if (keys[0] !== column.key) return column;

    let { children } = column;

    if (!children) {
      return { ...column, selected };
    }

    const childrenKeys = keys.slice(1);
    children = childrenKeys.length > 0 
      ? selectColumn(children, childrenKeys, selected) 
      : setColumnsSelectd(children, selected);

    return { ...column, children, selected: computeParentState(children, selected) };
  });
}

export function isDefaultSelected(column: { required?: boolean, defaultSelected?: boolean }) {
  return column.required || !!column.defaultSelected;
}

export function resetColumnsState(columns: ColumnType[]): ColumnType[] {
  return columns.map(column => {
    if (!column.children) {
      return { ...column, selected: isDefaultSelected(column) };
    }

    const children = resetColumnsState(column.children);
    const selected = computeParentState(children, true);

    return { ...column, selected, children };
  });
} 
