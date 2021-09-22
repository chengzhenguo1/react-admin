# React Admin

React Admin——一个基于React、TypeScript、Vite的编写的管理系统。

新建用户权限默认为admin,需要在用户管理中添加不同权限的用户。同时新建的用户也没有数据，需要自行添加。

## 项目体验地址

http://icloudmusic.top/reactAdmin


## 视频教学地址

https://www.bilibili.com/video/BV1Hg4y167v6?from=search&seid=14801539303278423807


## 使用

```
$ git clone https://github.com/chengzhenguo1/react-admin.git
$ cd react-admin
$ yarn install
$ yarn run dev
```

## 功能列表

- 登录/注册

  控制台

  -  基础信息
  -  人数统计 

- 用户管理

  -  添加用户
  -  编辑用户
  -  分配角色

- 部门管理

  -  部门列表
  -  添加部门

- 职位管理

  -  职位列表
  -  添加职位

- 职员管理

  -  职员列表
  -  职员添加

- 权限功能

  -  根据用户角色权限生成路由以及侧边栏导航
  -  根据权限来校验组件渲染

## 技术栈

- React，使用Redux做状态管理。
- Hook，react-use库（很方便）。
- TypeScript。
- antd 组件库。
- Less。
- Vite。
- Eslint做代码检查。



## 图片预览

![01_登录](./resources/01_登录.png)

![02_注册](./resources/02_注册.png)

![03_控制台](./resources/03_控制台.png)

![04_用户列表](./resources/04_用户列表.png)

![05_用户添加修改](./resources/05_用户添加修改.png)

![06_部门列表](./resources/06_部门列表.png)

![07_添加部门](./resources/07_添加部门.png)

![08_职位列表](./resources/08_职位列表.png)

![09_添加职位](./resources/09_添加职位.png)

![10_职员列表](./resources/10_职员列表.png)

![11_职员添加](./resources/11_职员添加.png)

## API接口

[api (web-jshtml.cn)](http://apidoc.web-jshtml.cn/#/home)
` 请求该地址即可http://old.web-jshtml.cn/api/react`

## 感谢

感谢**A总**老师的教学视频[手把手撸码前端 React 企业人事后台管理系统开发，由0到1自主搭建管理后台，学习React全家桶知识、Ant Design组件UI_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1Hg4y167v6?from=search&seid=14801539303278423807)

另附上官网手把手撸码前端 (web-jshtml.cn)](http://school.web-jshtml.cn/#/)，欢迎来一起学习
