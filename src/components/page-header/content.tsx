import React, { ReactNode, FC } from 'react';

export interface ContentProps {
  links?: ReactNode;
  extra?: ReactNode;
  prefixCls?: string;
}

const Content: FC<ContentProps> = ({ links, extra, prefixCls: rootPrefixCls, children }) => {
  if (!links && !extra && !children) return null;
  const prefixCls = `${rootPrefixCls}-content`;

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-left`}>
        {children}
        {links && <div className={`${prefixCls}-links`}>{links}</div>}
      </div>
      {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
    </div>
  );
};

export default Content;
