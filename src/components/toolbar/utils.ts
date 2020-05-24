import { ItemsType, ItemType, ItemGroupType, ScreenMap, Breakpoint } from './interface';

export type GridItemsType = [number, ItemType][];

function getItemSpan(responsive: Record<Breakpoint, number | boolean>, screens: ScreenMap) {
  return Object.keys(responsive)
    .filter(x => screens[x as Breakpoint])
    .map(x => responsive[x as Breakpoint])
    .sort((a, b) => Number(a) - Number(b))
    .shift();
}

export function ItemsGroup(
  items: ItemsType,
  screens: ScreenMap,
): [GridItemsType, ItemsType, ItemsType] {
  const grids: GridItemsType = [];
  const visible: ItemsType = [];
  const overflowed: ItemsType = [];

  for (const item of items) {
    const { responsive, children } = item as ItemGroupType;

    if (responsive === undefined) {
      if (children) {
        const [g, v, o] = ItemsGroup(children, screens);

        if (g.length > 0) {
          grids.push(...g);
        }

        if (v.length > 0) {
          visible.push({ ...item, children: v });
        }

        if (o.length > 0) {
          overflowed.push({ ...item, children: o });
        }
      } else {
        visible.push(item);
      }
    } else if (Array.isArray(responsive)) {
      if (responsive.some(x => screens[x])) {
        visible.push(item);
      } else {
        overflowed.push(item);
      }
    } else {
      const span = getItemSpan(responsive, screens);
      if (span === true) {
        visible.push(item);
      } else if (span) {
        grids.push([span, item]);
      }
    }
  }

  return [grids, visible, overflowed];
}
