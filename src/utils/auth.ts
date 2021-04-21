import { UserState } from '@src/store/module/user'
import store from 'store'

const authToken = 'admin_Token'
const authUser = 'admin_User'
const authRole = 'admin_Role'

export const getToken = ():string => (store.get(authToken) || '')

export const setToken = (token: string): void => store.set(authToken, token)

export const removeToken = ():void => (store.remove(authToken))

export const getUser = ():string => (store.get(authUser) || '')

export const setUser = (user: string): void => store.set(authUser, user)

export const removeUser = ():void => (store.remove(authUser))

export const getRole = ():string => (store.get(authRole) || '')

export const setRole = (role: string): void => store.set(authRole, role)

export const removeRole = ():void => (store.remove(authRole))

export const localSetUserInfo = (user: UserState):void => {
    setToken(user.token)
    setUser(user.username)
    setRole(user.role)
}

export const localRemoveUserInfo = ():void => {
    removeRole()
    removeToken()
    removeUser()
}
