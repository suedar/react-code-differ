# code-diff

本组件可用于代码差异的查看, 由于是 react 编写的，仅支持 react 版本

**[组件文档地址](https://63c4ee8240b12d9fbe70f43c-nqsqfzkhff.chromatic.com/?path=/story/code-diff--code-diff)**

先支持两种使用方式：
1. 本地文件引入
2. github 线上 diff 地址引入

## 安装

```
npm i code-diff
```

## 本地文件引入

```tsx
import { CodeDiff } from "code-diff";
import diffText from './diffText'

export const MyComponent = (args) => {
  return (
    <CodeDiff type={"local"} path={diffText} />
  );
};
```

![](https://antd-scss.cdn.bcebos.com/code-diff/IMG20230117114451.png)


## github 线上 diff 地址引入

```tsx
import { CodeDiff } from "code-diff";

export const MyComponent = (args) => {
  const path = "https://api.github.com/repos/rtfpessoa/diff2html/pulls/106"
  return (
    <CodeDiff type={"github"} path={path} />
  );
};
```

![](https://antd-scss.cdn.bcebos.com/code-diff/IMG20230117114502.png)