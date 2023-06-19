# 使用方法

## 安装
```js
1. 下载此包
2. 点开 chrome 浏览器扩展程序，到扩展程序页面
3. 左上角有一个加载已解压的扩展程序，选中当前项目的文件夹即可
```


## 在浏览器控制台使用
```js
_.concat(1, [2, 3, 4])
没有安装过 lodash 的话肯定会报错，ReferenceError: _ is not defined


yarn.search('lodash')
正在查询...
lodash.js - https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js
lowdb - https://cdnjs.cloudflare.com/ajax/libs/lowdb/1.0.0/low.min.js
angular-filter - https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.17/angular-filter.min.js
lodash-fp - https://cdnjs.cloudflare.com/ajax/libs/lodash-fp/0.10.4/lodash-fp.min.js
rambdax - https://cdnjs.cloudflare.com/ajax/libs/rambdax/9.1.1/rambdax.umd.js
alt-lodash - https://cdnjs.cloudflare.com/ajax/libs/alt-lodash/1.0.5/alt-lodash.esm.js
lodash-compat - https://cdnjs.cloudflare.com/ajax/libs/lodash-compat/3.10.2/lodash.min.js

// 该方法具有缓存功能，因为暂时没有支持版本号，所以安装同一个依赖但是不同版本号的时候，记得先刷新浏览器或者执行 yarn.clear()
yarn('lodash.js')
请稍等，正在安装包...
安装完成 ✅ cdn: cdnjs - lodash.js@4.17.21 安装成功。
安装时间：: 20.381103515625 ms


_.concat(1, [2, 3, 4])
(4) [1, 2, 3, 4]


// 如果想要安装具体版本，比如 lodash，可使用上面 yarn.search('lodash') 搜索出来的具体 CDN 链接，手动替换版本号即可
比如 yarn('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/0.1.0/lodash.min.js')


// 打印安装过的依赖的信息
yarn.log()


// 清除所有安装过的依赖（刷新浏览器也可以）
yarn.clear()
```
