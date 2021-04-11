import { getToken } from '@src/utils/auth'
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface IProps extends RouteProps{
    component: React.FC<any>
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (
            getToken() ? <Component {...props} /> : <Redirect to='/' />
    )} />
)

export default PrivateRoute
