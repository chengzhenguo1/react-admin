import store from 'store'

const authToken = 'admin_Token'

export const getToken = ():string | undefined => (store.get(authToken))

export const setToken = (token: string): void => store.set(authToken, token)

export const removeToken = ():void => (store.remove(authToken))
