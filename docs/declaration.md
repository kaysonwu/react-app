## 声明文件

如果一个类型需要多处引用，建议使用全局声明文件替代。全局声明文件放置在 `typings` 文件夹内。编写全局声明文件时，不可使用 `import` 和 `export` 等模块关键字，否则会当成模块处理。具体请参见：[issue](https://github.com/microsoft/TypeScript/issues/37294)