import React, { memo } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { IRoute, Roles } from '@src/router/type'
import { IStoreState } from '@src/store/type'
import { setSideBarRoutes } from '@src/store/module/app'
import routes from '@src/router'
import TransitionMain from '@src/components/TransitionMain'
import { checkAuth } from '@src/components/AuthWrapper'

interface AsyncRoutesProps {
  children: React.ReactNode
  init: boolean
  role: Roles 
  setSideBarRoutes: (routes: IRoute[]) => void
}

function formatMenuToRoute(menus: IRoute[], role: Roles): IRoute[] {
  const result: IRoute[] = []

  menus.forEach((menu) => {
    if ((menu?.path && !['/error', '/*'].includes(menu?.path as string)) && checkAuth(menu.roles, role)) {
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
   props.setSideBarRoutes(formatMenuToRoute(routes[1].children || [], props.role))

   return <Spin />
  }
  return <TransitionMain>{props.children}</TransitionMain>
}

export default connect(({ app, user: { role } }: IStoreState) => ({ init: app.init, role }), { setSideBarRoutes })(
  memo(AsyncRoutes),
)
