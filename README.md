## 有道命令行中英互译小工具
😊一个基于node.js的中英互译终端小程序,由有道智云提供后台数据支持。

#### 安装
```
npm install translate-node -g
```
---
#### 使用
```
yd <翻译的单词>  //支持中英互译
```
---
#### 插件
* [有道智云官方API](http://ai.youdao.com/docs/doc-trans-api.s#p01)
* axios *后台请求*
* commander *简化命令行开发*
* cli-spinner *查询等待动画*
* colors *输出字体颜色*
---
#### 建议
自己去[有道官方](http://ai.youdao.com/)注册申请key，然后替换src文件夹中config.js中appKey和key的值即可。
