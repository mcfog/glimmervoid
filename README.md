前端项目脚手架
============

一直惯用的前端脚手架，主要包含

+ gulp
+ webpack
+ less
+ bower

#### 目录结构参考

```js
var globs = {
    js: 'frontend/js/**/*.js',//js代码
    less: 'frontend/less/**/*.main.less',//less代码
    html: 'frontend/**/*.html',//html文件
    assets: [//其它资源
        'frontend/fonts/**/*',
        'frontend/images/**/*'
    ]
};
```

#### js

js文件命名为`*.main.js`时，会被视为webpack的入口文件，编译后输出对应的 `*.min.js`

webpack的自动加载除了包含npm和bower的包目录之外，另外包含了`lib`，也就是说可以在`frontend/js/lib/xxx.js`放置以来类库，代码中用`require('xxx')`加载

#### less

less文件命名为`*.main.less`时，会被视为入口，编译后输出对应的`*.min.css`


----

大概就是这样，很长时间没有更新，很多依赖都已经过时，这个版本会被tag为0.1版本。我们v0.2见
