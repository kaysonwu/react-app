import React, { ComponentType, CSSProperties, ReactNode, FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

export interface DragItem {
  type: string;
  index: number;
  extra?: unknown;
}

interface ItemProps extends DragItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: string | ComponentType<any>;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onDrop?: (from: DragItem, to: DragItem) => void;
}

const Drag: FC<ItemProps> = (
  {
    component: Component = 'div',
    className,
    style,
    children,
    onDrop,
    ...item
  },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ upward }, drop] = useDrop({
    accept: item.type,
    collect(monitor) {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === item.index || !monitor.isOver()) return {};

      return {
        upward: dragIndex > item.index,
      };
    },
    drop(from: DragItem) {
      if (from.index !== item.index && onDrop) {
        onDrop(from, item);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item,
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const cls = classNames(className, {
    'drop-over-upward': upward,
    'drop-over-downward': upward === false,
    'dragging': isDragging,
  });

  drag(drop(ref));

  return (
    <Component
      ref={ref}
      className={cls}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Drag;
