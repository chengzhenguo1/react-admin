import React, { memo } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { IRoute, Roles } from '@src/router/type'
import { IStoreState } from '@src/store/type'
import { setSideBarRoutes } from '@src/store/module/app'
import TransitionMain from '@src/components/TransitionMain'
import { checkAuth } from '@src/components/AuthWrapper'
import { menuRouteList } from '@src/router/utils'

interface AsyncRoutesProps {
  children: React.ReactNode
  init: boolean
  role: Roles 
  setSideBarRoutes: (routes: IRoute[]) => void
}

function formatMenuToRoute(menus: IRoute[], role: Roles): IRoute[] {
  const result: IRoute[] = []
  menus.forEach((menu) => {
    /* 查看当前路由表是否有权限 */
    if (((menu?.path && checkAuth(menu.roles, role)) && !menu.hidden)) {
      const route: IRoute = {
        path: menu.path,
        meta: { 
          title: menu.meta?.title || '未知',
          icon: menu.meta?.icon,
        },
      }
      if (menu.children) {
        route.children = formatMenuToRoute(menu.children, role)
      }
      result.push(route)
    }
  })
  return result
}

const AsyncRoutes: React.FC<AsyncRoutesProps> = (props) => {
  /* 需要登录后再初始化路由, 如果后端返回的路由表则不需要校验是否登录 */
  if (!props.init && props.role) {
    /* 
       进行侧边栏筛选渲染，查看当前路由是否有该权限
       可以进行异步请求后端路由表，根据后端存储的路由进行渲染，
       同时存储到Redux中，然后在Auth组件改变校验方式，也就是注释上的
       如
        apiGetMenuList()
        .then(({ data }) => {
          props.setSideBarRoutes(formatMenuToRoute(data.list));
        })
        .catch(() => {})
    */
   props.setSideBarRoutes(formatMenuToRoute(menuRouteList, props.role))

   return <Spin />
  }
  return <TransitionMain>{props.children}</TransitionMain>
}

export default connect(({ app, user: { role } }: IStoreState) => ({ init: app.init, role }), { setSideBarRoutes })(
  memo(AsyncRoutes),
)
