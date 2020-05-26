import React, { ReactNode, ReactElement, MouseEvent, FC } from 'react';
import { Avatar } from 'antd';
import { TagType } from 'antd/lib/tag';
import { AvatarProps } from 'antd/lib/avatar';
import renderBack from './back';

export interface HeaderProps {
  avatar?: AvatarProps;
  title?: ReactNode;
  subTitle?: ReactNode;
  tags?: ReactElement<TagType> | ReactElement<TagType>[];
  actions?: ReactNode;
  backIcon?: ReactNode;
  prefixCls?: string;
  direction?: 'ltr' | 'rtl';
  onBack?: (e?: MouseEvent<HTMLDivElement>) => void;
}

const Header: FC<HeaderProps> = props => {
  const { title, subTitle, tags, actions } = props;

  if (!title && !subTitle && !tags && !actions) {
    return null;
  }

  const { prefixCls: rootPrefixCls, avatar, direction, backIcon, onBack } = props;
  const prefixCls = `${rootPrefixCls}-heading`;

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-left`}>
        {renderBack(prefixCls, direction, backIcon, onBack)}
        {avatar && <Avatar {...avatar} />}
        {title && (
          <span
            className={`${prefixCls}-title`}
            title={typeof title === 'string' ? title : undefined}
          >
            {title}
          </span>
        )}
        {subTitle && (
          <span
            className={`${prefixCls}-sub-title`}
            title={typeof subTitle === 'string' ? subTitle : undefined}
          >
            {subTitle}
          </span>
        )}
        {tags && <span className={`${prefixCls}-tags`}>{tags}</span>}
      </div>
      {actions && <span className={`${prefixCls}-extra`}>{actions}</span>}
    </div>
  );
};

export default Header;
