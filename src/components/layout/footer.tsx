import React, { CSSProperties, FC } from 'react';
import { Layout } from 'antd';
import { normalizeIcon } from '../icon';

interface PageFooterProps {
  copyright?: React.ReactNode;
  links?: ILink[];
  prefixCls?: string;
  style?: CSSProperties;
}

const Footer: FC<PageFooterProps> = ({ links, copyright, prefixCls, ...props }) => (
  <Layout.Footer {...props} className={`${prefixCls}-footer`}>
    {links && (
      <nav className={`${prefixCls}-footer-link`}>
        {links.map(({ id, url, icon, name }) => (
          <a key={id} href={url} target="_blank" rel="noopener noreferrer">
            {icon
              ? (
                <>
                  {normalizeIcon(icon)}
                  <span>{name}</span>
                </>
              )
              : name}
          </a>
        ))}
      </nav>
    )}
    <div className={`${prefixCls}-footer-copyright`}>
      {copyright}
    </div>
  </Layout.Footer>
);

export default Footer;
