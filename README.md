此demo可高几率复现babel-plugin-import的一个bug
====

## 运行方法

执行`npm i`后，输入`npm start`即可自动弹出浏览器运行。此demo复现bug的几率大概为`4/5`左右。

## 起因

我们近半年做的一个项目在经webpack构建后访问页面`有时`会报错，几率比较低，大概10次中有1、2次左右。无论是用dev-server或是env设置为production打包上线后都一样有几率出错。

## bug出现的环境

`windows 7/10`环境下，`node v8`以上、`webpack v3/4`、`babel v6/7`。

## bug现象

使用babel-plugin-import构建代码后，访问页面时偶尔会报出这个错误：

![](images/1.png?raw=true)

查看JSX编译后的代码，生成了未定义的_Row、_Col等JSX组件变量：

![](images/2.png?raw=true)

该模块源码中是这样引入antd的：

```js
import { Row, Col, Menu, Dropdown, Icon } from 'antd';
```

但是查看构建后的模块顶部import部分，发现babel-plugin-import只正确转换了部分组件引入；另一部分组件引入并未正确生成：

![](images/3.png?raw=true)

如上，只正确生成了Icon组件，Row、Col等都没有转换，而是转换成了直接把antd全包引入了进来。

## bug分析

### 定位bug

经较长时间实践，暂定位bug原因为：

在babel-plugin-import插件的[Plugin.js](https://github.com/ant-design/babel-plugin-import/blob/master/src/Plugin.js)中，有`specified`、`libraryObjs`、`selectedMethods`、`pathsToRemove`几个用于存储当前正在遍历文件的状态对象。

而上述出错的原因在于，这些状态对象是存储在`Plugin`类的实例中的，而`Plugin`类的实例是全局变量(一般只有一个，当配置同时支持两个库是就会有两个)，并不是每个正在遍历的`js/jsx`文件各自独有的。

[这里](https://github.com/ant-design/babel-plugin-import/blob/master/src/index.js#L15)可以看出`Plugin`类的实例是全局变量，在每次调apply的时候传的第一个参数都是`Plugin`类的实例，这些实例保存在[一个全局的数组](https://github.com/ant-design/babel-plugin-import/blob/master/src/index.js#L5)中。

### 为什么这个bug只会偶然出现?

经一定实践，发现在一般正常的构建操作中，babel遍历文件时是按顺序的，比如`a.jsx`遍历完才开始遍历`b.jsx`。也就是说Visitor的`ProgramEnter`和`ProgramExit`总是按顺序成对的执行，`a.jsx`的这一套都执行完了才开始执行`b.jsx`的。

在babel-plugin-import插件中，会在`ProgramEnter`中给`selectedMethods`等状态对象做初始化。这样如果`ProgramEnter`和`ProgramExit`总是严格按文件顺序成对地执行，即使`selectedMethods`等保存在全局变量中也没有任何问题，因为后一个文件的`ProgramEnter`中会把前一个文件中的`selectedMethods`等再次初始化，也就不存在冲突了。

为了证实这点，在此demo中的babel-plugin-import插件，默认是从当前项目目录中的babel-plugin-import目录引入的，为的是在里面打印一些日志。在运行此demo时通常可看到如下正常`ProgramEnter`和`ProgramExit`按顺序成对出现的日志，此时会标记一个`(ok)`：

> 判断`(ok)`的依据是在`ProgramEnter`中保存当前文件名变量`__ProgramEnterFileName`，然后在`ProgramExit`中再用当前文件名和之前存储的`__ProgramEnterFileName`进行比较，一致则为`(ok)`。

```
ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page2\page2.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page2\page2.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page1\page1.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page1\page1.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page9\page9.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page9\page9.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page19\page19.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page19\page19.jsx
```

但是，经实践发现在`webpack + babel-loader`这个环境下，是有可能出现`ProgramEnter`和`ProgramExit`不按顺序成对执行的情况。这时日志中会打印`【Error!!】`：

```
ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page20\page20.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\stores\pages\page19Store.js

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\stores\pages\page19Store.js

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\stores\pages\page17Store.js

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\stores\pages\page17Store.js

【Error!!】ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page20\page20.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page16\page16.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page16\page16.jsx
```

从上面可以看出，出现错误的文件`page20.jsx`中的`ProgramEnter`和`ProgramExit`并没按顺序成对地出现。而此时点击demo中左侧菜单访问相应的页面：

![](images/4.png?raw=true)

就会报出`_Row is not defined`的错误：

![](images/5.png?raw=true)

## 解决方案

有一个较成功的css in js插件`styled-jsx`，它也是一个babel插件。参考了[它内部存储状态的方案](https://github.com/zeit/styled-jsx/blob/master/src/babel.js#L274)，可以将状态保存在Visitor中各方法提供的`state`变量中，也就是`path`后的第二个参数。因为`state`对于每个babel正在遍历的文件来说是各自独立的，保存在它上不会出现保存在全局变量中冲突的问题。

依这个思路修改插件后，可将此demo中的`.babelrc`配置里的`./babel-plugin-import`改为`./babel-plugin-import-fixed`。`./babel-plugin-import-fixed`里面的是将状态保存在`state`中的方案。经我们一段时间实战测试后，每次执行构建均无此bug：

> 为了支持插件配置多个库，相应地在state中保存状态时，需要按照当前Plugin类实例的索引值在state上为不同的库建立多个状态对象。[具体代码请看这里](https://github.com/joe-sky/babel-plugin-import/blob/master/src/Plugin.js#L46)

```
ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\components\sider\sider.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\components\header\header.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page16\page16.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page16\page16.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\components\header\header.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page15\page15.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page15\page15.jsx

ProgramEnter: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page14\page14.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\pages\page14\page14.jsx

(ok)ProgramExit: D:\joe_sky\flareJ\flareJ\JsLibrary\test-babel-plugin-import-bug\src\web\components\sider\sider.jsx
```

如上所示，在改进后即使`ProgramEnter`和`ProgramExit`不按顺序成对执行也不会造成错误。
