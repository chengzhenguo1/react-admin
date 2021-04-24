import { Roles } from '@src/router/type'
import { IStoreState } from '@src/store/type'
import React, { memo } from 'react'
import { connect } from 'react-redux'

interface IProps {
    roles?: Roles[]
    role?: Roles
    component: any
    noMatch?: React.ReactNode | null // 不匹配后的结果
}

export const checkAuth = (roles?: Roles[], auth?: Roles) => {
    if (!roles) {
        return true
    }
    /* 判断用户是否在校验表中，条件渲染组件 */
    return !!roles.includes(auth as never)
}

const AuthWrapper: React.FC<IProps> = memo(({
 roles, role, component: Component, noMatch = null, 
}) => (
         checkAuth(roles, role) ? Component : noMatch
))

export default connect(({ user: { role } }: IStoreState) => ({ role }), null)(AuthWrapper)
