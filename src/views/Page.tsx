import React, { memo } from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from '@src/components/PrivateRoute'
import LayOut from '@src/components/Layout'
import NotFount from '@src/components/NotFount'
import Dashboard from './Dashboard'
import User from './User'

const Page: React.FC = memo(() => (
    <LayOut>
        <Switch>
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/user' component={User} />
            <PrivateRoute path='*' component={NotFount} exact />
        </Switch>
    </LayOut>
))

export default Page
