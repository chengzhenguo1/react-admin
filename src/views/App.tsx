import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import LayOut from '@src/components/Layout'
import NotFount from '@src/components/NotFount'
import Login from './Login/index'
import Page from './Page'

import 'antd/dist/antd.css'

function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path='/' component={Login} exact />
              <Page />
          </Switch>
      </HashRouter>
  )
}

export default App
