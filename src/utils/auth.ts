import store from 'store'

const authToken = 'admin_Token'
const authUser = 'admin_User'

export const getToken = ():string | undefined => (store.get(authToken))

export const setToken = (token: string): void => store.set(authToken, token)

export const removeToken = ():void => (store.remove(authToken))

export const getUser = ():string | undefined => (store.get(authUser))

export const setUser = (user: string): void => store.set(authUser, user)

export const removeUser = ():void => (store.remove(authUser))
