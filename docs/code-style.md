# JavaScript 风格指南

本指南继承自 [Airbnb](https://github.com/airbnb/javascript)，所以不会列出所有风格，只会记录差异与重点的规则。

**注意：** 为了更好的遵循风格指南，请为编辑器安装 [ESLint](https://eslint.org/) 扩展插件，具体安装方式请参阅 [ESLint 集成指南](https://eslint.org/docs/user-guide/integrations)

## 目录

- Javascript
  - [函数](#函数)
  - [箭头函数](#箭头函数)
  - [可选链](#可选链)
  - [空值合并](#空值合并)
  - [括号](#括号)
- React
  - [函数组件](#函数组件)

## 函数

- 在 Typescript 中不显示定义函数的返回类型，应该优先依赖类推推断。规则：[`@typescript-eslint/explicit-function-return-type`](https://github.com/typescript-eslint/typescript-eslint/blob/v2.27.0/packages/eslint-plugin/docs/rules/explicit-function-return-type.md)

  ```ts
  // bad
  function test(): string {
    return 'Hello';
  }

  // good
  function test() {
    return 'Hello';
  }
  ```

## 箭头函数

如果你的函数只有一个参数并且函数体没有大括号，就删除圆括号。 规则: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html)

```js
// bad
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(
  number =>
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`,
);

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});
```

## 可选链

使用简洁的可选链表达式，而不是链式逻辑与。规则：[`@typescript-eslint/prefer-optional-chain`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md)

> TypeScript 3.7 添加了对可选链运算符的支持

```ts
type T = {
  a?: {
    b?: {
      c: string;
      method?: () => void;
    };
  };
};

// bad
function myFunc(foo: T | null) {
  return foo && foo.a && foo.a.b && foo.a.b.c;
}

// good
function myFunc(foo: T | null) {
  return foo?.a?.b?.c;
}
```

## 空值合并

使用 `nullish` 合并运算符，而不是逻辑链接。规则：[`@typescript-eslint/prefer-nullish-coalescing`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md)

> TypeScript 3.7 添加了对 `nullish` 合并运算符的支持

**Why?** 因为 `nullish` 合并运算符仅对原始值为 `null` 或 `undefined` 时合并，这要比逻辑或 `||` 运算符安全得多。比较示例：

```ts
const emptyString = '';

const nullish1 = emptyString ?? 'unsafe';
const logical1 = emptyString || 'unsafe';

// nullish1 === ''
// logical1 === 'unsafe'
```

```ts
// bad
function myFunc(foo: string | null) {
  return foo !== null && foo !== undefined ? foo : 'a string';
}

// good
function myFunc(foo: string | null) {
  return foo ?? 'a string';
}
```

## 括号

禁止不必要的括号。 规则: [`no-extra-parens`](https://eslint.org/docs/rules/no-extra-parens)

```js
// bad
a = b * c;

// good
a = b * c;

// bad
a * b + c;

//good
a * b + c;
```

## 函数组件

在 Typescript 中使用箭头函数声明函数组件更具清晰易懂。规则: [`react/function-component-definition`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md)

```tsx
// bad
function Component() {
  return <div />;
}

// bad
const Component = function (props) {
  return <div />;
};

// good
const Component: React.FC = props => {};

// very good
interface ComponentProps {
  name: string;
}

const Component: React.FC<ComponentProps> = props => {};
```
