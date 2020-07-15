import React, { SyntheticEvent, ReactNode, Key, HTMLAttributes, Fragment } from 'react';
import { compile } from 'path-to-regexp';
import { Link } from 'react-router-dom';
import { Divider, Button, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import Icon from '@/components/icon';
import { RecordType } from '../interface';

export type Callback = Record<string, (e: SyntheticEvent) => void>;

export interface RenderOptions<T> {
  // 是否显示分割线
  divider?: boolean;
  // 触发动作后的事件回调
  callback: Callback;
  // 将记录转换成 “键值对” 对象，用于链接参数
  transform?: (record: T) => object;
  // 需要二次确认的动作
  confirm: Record<string, PopconfirmProps>;
  // 过滤动作
  filter?: (action: IMenu, record: T) => boolean;
  // 自定义动作渲染
  render?: (action: IMenu, record: T, callback: Callback) => ReactNode;
}

function createRender<T extends RecordType>(
  actions: IMenu[],
  mapper: (name: string, record: T) => string,
  options: RenderOptions<T>,
) {
  const { divider = true, callback, transform, confirm, filter, render } = options;
  return (id: Key, record: T) => {
    const items = filter ? actions.filter(action => filter(action, record)) : actions;
    const lastIndex = items.length - 1;

    return items.map((action, index) => {
      let node;

      if (render) {
        node = render(action, record, callback);
      } else {
        const { name, url, icon } = action;
        const title = mapper(name, record);
        const children = icon ? <Icon type={icon} title={title} /> : title;

        if (url) {
          const to = compile(url)(transform ? transform(record) : record);
          node = <Link key={id} to={to}>{children}</Link>;
        } else {
          const props = confirm[name];
          const onClick = callback[name];

          if (props) {
            node = (
              <Popconfirm
                key={name}
                {...props}
                okButtonProps={{ 'data-id': id } as HTMLAttributes<HTMLElement>}
                // @ts-ignore
                onConfirm={onClick}
              >
                <Button type="link">{children}</Button>
              </Popconfirm>
            );
          } else {
            node = <Button key={name} type="link" data-id={id} onClick={onClick}>{children}</Button>;
          }
        }
      }

      if (divider && index < lastIndex) {
        return (
          <Fragment key={action.name}>
            {node}
            <Divider type="vertical" />
          </Fragment>
        );
      }

      return node;
    });
  };
}

export default createRender;
