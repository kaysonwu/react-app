import React, { ReactNode } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

// eslint-disable-next-line react/function-component-definition
export function normalizeIcon(icon: ReactNode, props?: IconFontProps) {
  return typeof icon === 'string' ? <Icon {...props} type={icon} /> : icon;
}

export default Icon;
