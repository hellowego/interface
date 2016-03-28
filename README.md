## 介绍
starfish 是提供服务给第三方使用的接口中心，对外提供socket、webservice、Http服务，将接受到的请求转换成json数据结构转发给核心系统。  
项目使用了nodejs框架开发，http服务使用express框架，log4js记录日志，数据库使用mongodb，orm使用mongoose。  

## 开发环境  
安装nodejs 下载地址： https://nodejs.org/en/  
安装依赖的库：  
npm install  

## 启动程序  
node interfaceServer  

## 已经实现的功能  
http服务:  
1. 路由配置文件  
1. 接受get、post请求  
2. post 转发get，post转发post  

log4js :  
1. 日志json配置文件  
2. 有三种日志文件：access、app、error， access 记录报文日志，app记录所有日志，error记录异常错误日志  

socket模块:  
1. 实现服务端server demo （ZY）

框架模块:  
package.json 文件 （CF）

## 待实现的功能  
大模块：
1. 找一个测试框架，并实现demo  
2. 找一个webservice 第三方库，实现server端，并提供demo  
3. redis内存数据库  
3. mongoose orm架构  


小模块：
4. 实现一个json字符串校验器，如：{"cardno":{"length":5, "number":true, "necessary":true}}，实现length，number, necessary函数，函数放在validator文件夹中


