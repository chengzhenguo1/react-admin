import { Roles } from '@src/router/type'
import React, { memo } from 'react'

interface IProps {
    roles?: Roles[]
    component: any
}

const checkAuth = (roles?: Roles[], auth?: Roles) => {
    if (!roles) {
        return true
    }
    return !!roles.includes(auth as never)
}

const AuthWrapper: React.FC<IProps> = memo(({ roles, component: Component }) => {
   const user = 'admin'
   return (
        checkAuth(roles, user) ? Component : null
    )
 })

export default AuthWrapper
