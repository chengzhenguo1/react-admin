import React, { memo } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { IRoute, Roles } from '@src/router/type'
import { IStoreState } from '@src/store/type'
import { setSideBarRoutes } from '@src/store/module/app'
import TransitionMain from '@src/components/TransitionMain'
import { checkAuth } from '@src/components/AuthWrapper'
import { authRoutes } from '@src/router'

interface AsyncRoutesProps {
  children: React.ReactNode
  init: boolean
  role: Roles 
  setSideBarRoutes: (routes: IRoute[]) => void
}

function formatMenuToRoute(menus: IRoute[], role: Roles): IRoute[] {
  const result: IRoute[] = []
  menus.forEach((menu) => {
    /* 查看当前路由表的是否有权限 */
    if ((menu?.path && checkAuth(menu.roles, role))) {
      const route: IRoute = {
        path: menu.path,
        meta: { 
          title: menu.meta.title,
          icon: menu.meta.icon,
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
  if (!props.init) {
    /* 
       进行侧边栏筛选渲染，查看当前路由是否有该权限
       可以进行异步请求后端路由表，根据后端路由进行渲染侧边栏
       如
        apiGetMenuList()
        .then(({ data }) => {
          props.setSideBarRoutes(formatMenuToRoute(data.list));
        })
        .catch(() => {})
    */
   props.setSideBarRoutes(formatMenuToRoute(authRoutes, props.role))

   return <Spin />
  }
  return <TransitionMain>{props.children}</TransitionMain>
}

export default connect(({ app, user: { role } }: IStoreState) => ({ init: app.init, role }), { setSideBarRoutes })(
  memo(AsyncRoutes),
)
