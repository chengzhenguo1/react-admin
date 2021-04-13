import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { Roles } from '@src/router/type'
import { getToken } from '@src/utils/auth'

interface IProps extends RouteProps{
    component: React.FC<any>
}

const checkAuth = (roles?: Roles[], auth?: Roles) => {
    if (!roles) {
        return true
    }
    return !!roles.includes(auth as never)
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
            getToken() ? <Component {...props} /> : <Redirect to='/' />
    )} />
)

export default PrivateRoute
