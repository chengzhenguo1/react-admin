import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Login from './Login/index'
import 'antd/dist/antd.css'

function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path='/' component={Login} />
          </Switch>
      </HashRouter>
  )
}

export default App
