import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Roles } from '@src/router/type'
import { getToken } from '@src/utils/auth'
import { IStoreState } from '@src/store/type'
import { UserState } from '@src/store/module/user'

interface IProps extends RouteProps{
    component: React.FC<any>
    token: string
    role: string
}

const checkAuth = (roles?: Roles[], auth?: Roles) => {
    if (!roles) {
        return true
    }
    return !!roles.includes(auth as never)
}

const PrivateRoute: React.FC<IProps> = ({
 role, token, component: Component, ...rest 
}) => {
    console.log(token)
    return (
        <Route
          {...rest}
          render={(props) => (
            token ? <Component {...props} /> : <Redirect to='/' />
    )} />
)
 }

export default connect(({ user: { token, role } }: IStoreState) => ({ role, token }))(PrivateRoute)
