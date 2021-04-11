import React, { memo } from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from '@src/components/PrivateRoute'
import Dashboard from './Dashboard'
import User from './User'

const Page: React.FC = memo(() => (
    <Switch>
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/user' component={User} />
    </Switch>
))

export default Page
