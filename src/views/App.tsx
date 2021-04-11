import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import LayOut from '@src/components/Layout'
import Login from './Login/index'
import Page from './Page'

import 'antd/dist/antd.css'

function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path='/' component={Login} exact />
              <LayOut>
                  <Page />
              </LayOut>
          </Switch>
      </HashRouter>
  )
}

export default App
