
export type Theme = {
  // Menu layout
  layout: 'top' | 'sider' | 'top-sider' | 'sider2';
  // Theme style light-dark 与 dark-light 不支持 top 布局
  style: 'dark' | 'light' | 'light-dark' | 'dark-light';
  // Primary Color
  color: string;
  // true 流式宽度 number 固定宽度 仅在布局为 top 时有效
  contentWidth: true | number;
  colorWeak?: boolean;
  fixedHeader?: boolean;
  fixSiderbar?: boolean;
};

export function getTheme(theme?: Theme) {
  // #if WEB
  const value = localStorage.getItem('theme');

  if (value) {
    return JSON.parse(value);
  }
  // #endif

  return theme;
}

// #if WEB
export function setTheme(theme: Theme) {
  localStorage.setItem('theme', JSON.stringify(theme));
}
// #endif
