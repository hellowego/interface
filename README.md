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


## 待实现的功能  
大模块：
1. 找一个socketct 第三方库，实现server,client，并提供demo  
2. 找一个webservice 第三方库，实现server,client，并提供demo  
3. redis内存数据库  
3. mongoose orm架构  

小模块：
1. package.json 描述包文件，定义依赖的nodejs模块  


