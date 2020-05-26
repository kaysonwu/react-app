import React, { ReactNode, CSSProperties, FC, useMemo, useContext, isValidElement, Fragment } from 'react';
import classNames from 'classnames';
import { Grid, Row, Col } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns';
import { normalizeIcon } from '../icon';
import { ItemsType, ItemGroupType, ItemType } from './interface';
import Dropdown from './dropdown';
import { ItemsGroup, GridItemsType } from './utils';
import './index.less';

const { useBreakpoint } = Grid;

interface ToolbarProps {
  items?: ItemsType;
  overflowedIndicator?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Toolbar: FC<ToolbarProps> = (
  {
    items: customizeItems,
    overflowedIndicator,
    children,
    className: customizeClassName,
    style,
  },
) => {
  const screens = useBreakpoint();
  const [grids, visible, overflowed] = useMemo(() => ItemsGroup(
    customizeItems || convertChildrenToColumns(children) as ItemsType,
    screens,
  ), [customizeItems, children, screens]);

  // Componet Style
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('toolbar');
  const className = classNames(prefixCls, customizeClassName);

  const renderItem = (item: ItemType, overflowed?: boolean) => {
    const { key, component: Component, icon, title } = item;

    if (Component && !isValidElement(Component)) {
      return (
        <Component
          key={key}
          icon={overflowed ? undefined : normalizeIcon(icon)}
          title={title}
          overflowed={overflowed}
        />
      );
    }

    return <Fragment key={key}>{Component}</Fragment>;
  };

  function renderItems(items: ItemsType) {
    return items.map(item => {
      const { children } = item as ItemGroupType;

      if (!children) {
        return renderItem(item);
      }

      const { key, align = 'left' } = item as ItemGroupType;
      const className = `${prefixCls}-group ${prefixCls}-group-align-${align}`;

      return (
        <div key={key} className={className}>
          {renderItems(children)}
        </div>
      );
    });
  }

  function renderGrids(items: GridItemsType) {
    return items.map(([span, item]) => (
      <Col key={item.key} span={span}>
        {renderItem(item)}
      </Col>
    ));
  }

  return (
    <div className={className} style={style}>
      {grids.length > 0 && (
        <Row className={`${prefixCls}-row`}>
          {renderGrids(grids)}
        </Row>
      )}
      {renderItems(visible)}
      {overflowed.length > 0 && (
        <Dropdown
          items={overflowed}
          prefixCls={prefixCls}
          renderItem={renderItem}
          overflowedIndicator={overflowedIndicator}
        />
      )}
    </div>
  );
};

export default Toolbar;
