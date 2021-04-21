import React, { memo, useMemo } from 'react'
import { IRoute } from '@src/router/type'
import { businessRouteList } from '@src/router/utils'
import { Route } from 'react-router-dom'
import Auth from '../Auth'
import AsyncRoutes from '../AsyncRoutes/AsyncRoutes'

function renderRoute(route: IRoute) {
    const { component: Component } = route
  
    return (
        <Route
          key={`${route.path}`}
          exact={route.path !== '*'}
          path={route.path}
          render={(props) => (
              <Auth {...props} route={route}>
                  <Component {...props} />
              </Auth>
        )} />
    )
}

/* 条件渲染/下的路由列表 */
function renderRouteList(): React.ReactNode[] {
    const result: React.ReactNode[] = []

    businessRouteList.forEach((child: IRoute) => {
      result.push(renderRoute(child))
    })
  
    return result
}

const MainRoutes: React.FC = memo(() => {
    const routeList = useMemo(() => renderRouteList(), [])

    return (
        <AsyncRoutes>{routeList}</AsyncRoutes>
    )
 })

export default MainRoutes
