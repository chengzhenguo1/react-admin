import React, { Suspense } from 'react'
import { Switch, HashRouter, Route } from 'react-router-dom'
import { layoutRouteList } from '@src/router/utils'
import { Spin } from 'antd'
import { IRoute } from '@src/router/type'
import '@src/styles/global.less'

const App = function () {
  return (
      <Suspense fallback={<Spin className='lazy_loading' />}>
          <HashRouter>
              <Switch>
                  {layoutRouteList.map((route: IRoute) => (
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
