## Hook 数据流

> 设计参考自：[ahooks](https://ahooks.js.org/zh-CN)

### useList

`useList` 对数据表格常用的动作进行了封装以及权限处理。针对没有权限的动作可以实现自动隐藏

### useRequest

`useRequest` 通常用于单个请求，与 `ahooks` 不同的是，它没有太多的东西，因为大多数后台程序都会被公共的响应与请求拦截器进行了处理，所以通常只关注 **data**、**loading**、**error** 这三个属性
