import React, { Suspense } from 'react'
import { Switch, HashRouter, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import '@src/styles/global.less'
import { layoutRouteList } from '@src/router/utils'
import { RouterConfig } from '@src/router/type'

const App = function () {
  return (
      <Suspense fallback={null}>
          <HashRouter>
              <Switch>
                  {layoutRouteList.map((route: RouterConfig) => (
                      <Route
                        key={`${route.path}`}
                        path={route.path}
                        exact={route.exact}
                        component={route.component} />
                    ))}
              </Switch>
          </HashRouter>
      </Suspense>
  )
}

export default App
