import React, { memo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import store from '@src/store/index'
import { businessRouteList } from '@src/router/utils'
/* import config from '../config/index' */
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

  if (!route) {
    return true
  }

  if (route.redirect) {
    return true
  }

  if (!route.roles) {
    return true
  }
  // 路由存在于系统中，查看该用户是否有此路由权限
  /* if (!flattenRoutes.find((child) => child.path === location.pathname)) {
    return false
  } */

  /* 当前用户是否有该路由权限 */
  if (!route.roles?.includes(role as Roles)) {
    return false
  }

  return true
}

function Auth(props: AuthProps) {
  // 未登录
  if (!getToken()) {
    return (
        <Redirect
          to={`/login?redirectURL=${encodeURIComponent(
          window.location.origin
            + props.location.pathname
            + props.location.search,
        )}`} />
    )
  }

  // 检查授权
  if (!checkAuth(props.location)) {
    return <Redirect to='/error/403' push />
  }

  if (props.route.redirect) {
    return <Redirect to={props.route.redirect!} push />
  }

  return <>{props.children}</>
}

export default memo(Auth)
