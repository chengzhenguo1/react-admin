import React, { memo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import store from '@src/store/index'
import { businessRouteList } from '@src/router/utils'
import { getToken } from '@src/utils/auth'
import { Roles, IRoute } from '@src/router/type'

interface AuthProps extends RouteComponentProps {
  route: IRoute
  children: React.ReactNode
}

function checkAuth(location: RouteComponentProps['location']): boolean {
  // redux 中的 routes 同时负责渲染 sidebar
  /* const { flattenRoutes } = store.getState().app */

  const { role } = store.getState().user

  // 判断当前访问路由是否在系统路由中, 不存在直接走最后默认的 404 路由
  const route = businessRouteList.find((child) => child.path === location.pathname)

  // 当前路由不存在直接返回
  if (!route) {
    return true
  }

  // 当前路由存在跳转也返回true
  if (route.redirect) {
    return true
  }

  // 不需要检验也返回true
  if (!route.roles) {
    return true
  }

  /*   // 查看当前路由是否存在系统中，该用户是否有此路由权限，后端返回路由表的时候使用该方法
   if (!flattenRoutes.find((child) => child.path === location.pathname)) {
    return false
  }  */

  /* 当前用户角色是否有该路由权限，没有返回403 */
  if (!route.roles?.includes(role as Roles)) {
    return false
  }

  return true
}

function Auth(props: AuthProps) {
  // 判断是否登录
  if (!getToken()) {
    return (
        <Redirect
          to={`/system/login?redirectURL=${encodeURIComponent(
          window.location.origin
            + props.location.pathname
            + props.location.search,
        )}`} />
    )
  }

  // 检查是否有权限
  if (!checkAuth(props.location)) {
    return <Redirect to='/error/403' push />
  }

  // 检查是否有跳转
  if (props.route.redirect) {
    return <Redirect to={props.route.redirect} push />
  }

  // 进行渲染 route
  return <>{props.children}</>
}

export default memo(Auth)
