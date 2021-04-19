import React, { memo, useMemo } from 'react'
import { useTitle } from 'react-use'
import { RouterConfig } from '@src/router/type'
import { businessRouteList, getPageTitle } from '@src/router/utils'
import { Route } from 'react-router-dom'
import Auth from '../Auth'

function renderRoute(route: RouterConfig) {
    const title = getPageTitle(businessRouteList)

    /* useTitle(title) */

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

function renderRouteList(): React.ReactNode[] {
    const result: React.ReactNode[] = []
  
    businessRouteList.forEach((child: RouterConfig) => {
      result.push(renderRoute(child))
    })
  
    return result
}

const MainRoutes: React.FC = memo(() => {
    const routeList = useMemo(() => renderRouteList(), [])

    return (
        <Route>{routeList}</Route>
    )
 })

export default MainRoutes
