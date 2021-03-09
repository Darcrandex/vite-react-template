# vite2.0 + react

> 已完成的功能

1. less + css module
2. mobx@6 + mobx@7 + mobx-hooks
3. react-router
4. antd@4, 按需加载 + 自定义样式 + 全局 less 变量
5. 集成`axios`

> 存在的问题

1. 不能使用 `装饰器`. 不过使用`react-hooks`+`函数组件`也不需要用到装饰器
2. `eslint`还没有引入
3. `ie`兼容性, 使用`@vitejs/plugin-legacy`插件可以一定程度的兼容旧浏览器, 但是`vite`是针对现代浏览器的, `ie`其实可以被放弃
