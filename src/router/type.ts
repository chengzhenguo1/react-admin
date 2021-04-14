import { RouteProps } from 'react-router-dom'

export type Roles = ('admin'| 'user')

export interface RouterConfig extends RouteProps{
    // 子路由
    children?: RouterConfig[]
    // 路由组件
    component?: any
    // 跳转路由
    redirect?: string
    //  roles: ['admin', 'user']   权限校验 将控制页面角色（允许设置多个角色） 子路由会继承父路由的 roles 属性
    roles?: Roles[]
    // 路由信息
    meta: IRouteMeta
}

export interface IRouteMeta {
    title: string;
    icon?: string;
}
