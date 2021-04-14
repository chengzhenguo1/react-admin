import { Roles } from '@src/router/type'
import React, { memo } from 'react'

interface IProps {
    roles?: Roles[]
    component: any
    noMatch?: React.ReactNode | null // 不匹配后的结果
}

const checkAuth = (roles?: Roles[], auth?: Roles) => {
    if (!roles) {
        return true
    }
    /* 判断用户是否在校验表中，条件渲染组件 */
    return !!roles.includes(auth as never)
}

const AuthWrapper: React.FC<IProps> = memo(({ roles, component: Component, noMatch = null }) => {
   const user = 'admin'
   return (
         checkAuth(roles, user) ? Component : noMatch
    )
 })

export default AuthWrapper
