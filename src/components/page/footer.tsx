import React from 'react';
import { Layout } from 'antd';

interface PageFooterProps {
  copyright: React.ReactNode;
  links?: string[];
}

export default ({ copyright, links, ...props }: PageFooterProps) => {
  return (
    <Layout.Footer {...props}>
      {links && <nav className="links">{links.map(link => <a></a>)}</nav>}
      <div className="copyright">{copyright}</div>
    </Layout.Footer>
  );
};
