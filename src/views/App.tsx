import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Login from './Login/index'
import Page from './Page'
import 'antd/dist/antd.css'

const App = function () {
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
