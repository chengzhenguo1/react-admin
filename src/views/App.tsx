import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import Login from './Login/index'
import LayOut from '@src/components/Layout'
import Home from './Home'

import 'antd/dist/antd.css'

function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path='/' component={Login} exact />
              <LayOut>
                 <Route path='/home' component={Home} />
              </LayOut>
          </Switch>
      </HashRouter>
  )
}

export default App
