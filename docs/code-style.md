# 一致的代码风格

脚手架选用了 [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io/) + [Prettier](https://prettier.io/) 的组合方式来保证协作开发时具有一致的代码风格。其中 [Airbnb](https://github.com/airbnb) 风格深受社区喜爱：

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb CSS / Sass Style Guide](https://github.com/airbnb/css)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

代码风格是所有程序员都要遇到的问题，不管是团队协作还是个人练习。优秀的代码风格可以让开发人员保持愉悦的编码心情也能提高代码质量和开发效率，但是过度的强调代码风格会让项目在业务推进上变得迟缓

因此，面对 **代码风格的争议**，脚手架选择 **搁置争议**，通过引入 [husky](https://typicode.github.io/husky) + [lint-staged](https://www.npmjs.com/package/lint-staged) 等插件，在代码提交到仓库时，对代码进行风格修复与格式化，具体参见 `package.json` 文件中的 `lint-staged` 配置:

```json
{
  ...
  "lint-staged": {
    "*.{js,ts,tsx}": [
      // 对 Javascript 代码先使用 eslint 修复再使用 prettier 格式化
      "eslint --fix",
      "prettier --write"
    ],
    "*.less": [
      // 对于 CSS 代码先使用 stylelint 修复再使用 prettier 格式化
      "stylelint --syntax less --fix",
      "prettier --write"
    ],
    // 对于 Json，Markdown 文件使用 prettier 格式化
    "*.{json,md}": "prettier --write"
  },
  ...
}
```

至此，开发人员在实际开发的过程中无需刻意的去遵循编码风格，在保证业务有序的推进下又能将具有一致的代码风格推送至仓库。而整个代码风格的管理几乎处于 **无感** 状态

### 可能出现的问题？

#### 提交代码时报错，无法提交代码？

出现这种情况时，你可以点击 `打开 Git 日志`，通过查看日志重点注意下 `lint` 的错误提示来定位错误，因为有些错误 `lint` 插件是无法自动完成修复的，需要手动修复。示例日志：

```text
...
✖ stylelint --syntax less --fix:

src/index.less
 4:3  ✖  Unexpected browser feature "flexbox" is not supported by IE 9   plugin/no-unsupported-browser-features

```

#### 为什么代码提交后没有自动修复和格式化？

由于 [husky](https://typicode.github.io/husky) 自 `6.x` 版本起使用了 [git](https://git-scm.com/) 的新特性 `core.hooksPath`，该特性从 `2.8` 起可用，所以请确保你的 [git](https://git-scm.com/) 版本 `>=2.8`
