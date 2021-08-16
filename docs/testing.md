## 自动化测试

脚手架选用了由 Facebook 团队出品的 Javascript 测试框架 [jest](https://jestjs.io/)，[jest](https://jestjs.io/) 是一款优雅、简洁的 JavaScript 测试框架，[jest](https://jestjs.io/) 支持 [Babel](https://babeljs.io)、[TypeScript](https://www.typescriptlang.org)、[Node](https://nodejs.org)、[React](https://reactjs.org)、[Angular](https://angular.io)、[Vue](https://vuejs.org) 等诸多框架

脚手架将测试代码与源代码分离，测试代码统一放置在 `tests` 文件夹内，并按照 `src` 目录结构进行组织，为了你能够更流畅的抒写测试代码，你首先需要熟悉 [jest](https://jestjs.io/) 并了解 [jest cli 选项](https://jestjs.io/zh-Hans/docs/cli)

### 测试命令

```shell
yarn test --coverage
```

#### 测试单个文件

```shell
yarn test filename --coverage
```

#### 测试指定名称的测试用例

```shell
yarn test --testNamePattern "snake"

// 缩写方式
yarn test -t snake
```

<p align="center">
<br />
<a href="/docs/mock.md"><< 数据模拟</a>
&emsp;&emsp;&emsp;&emsp;
<a href="/docs/code-splitting.md">代码分离 >></a>
</p>
