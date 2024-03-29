# 声明文件

TypeScript 的类型定义声明文件有两种写法，一种叫做 **全局类型声明(Global Type Definition)**，另一个则是叫做 **模块导出声明(External Module Definition)**。

## 模块导出声明写法

```ts
// 导出接口
export interface ViewProps {
  user: Record<string, string>;
}

// 导出函数
export function upperWords(value: string): string {}
```

## 全局类型声明写法

```ts
interface IUser {
  id: number | string;
  avatar: string;
  name: string;
}
```

如果一个类型需要多处引用且是一个纯约定类型，建议使用全局声明文件替代，这样可以节省不必要的 `import`。例如：API 约定的数据对象。

全局声明文件放置在 [src/typings](getting-started.md#目录结构) 文件夹内。编写全局声明文件时，不可使用 `import` 和 `export` 等模块关键字，否则会自动转成模块导出声明。但是，可以使用 `import()` 语法来实现类型复用

```ts
interface Locale {
  /**
   * Antd component language pack.
   *
   * @example import zh_CN from antd/lib/locale-provider/zh_CN
   */
  antd?: import('antd/lib/locale-provider').Locale;

  /**
   * Antd form component validate messages.
   */
  validateMessages?: import('rc-field-form/lib/interface').ValidateMessages;

  /**
   * Dayjs
   */
  dayjs?: import('dayjs/locale/*').Locale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
```

<p align="center">
<br />
<a href="/docs/compat.md"><< 浏览器兼容性</a>
&emsp;&emsp;&emsp;&emsp;
<a href="/docs/code-style.md">一致的代码风格 >></a>
</p>
