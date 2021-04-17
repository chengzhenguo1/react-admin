import { Reducer } from 'redux'
import {
 getRole, getToken, localSetUserInfo, localRemoveUserInfo, getUser, 
} from '@src/utils/auth'
import { IAction } from '../type'

export interface UserState {
    username: string
    token: string
    role: string
}

const defaultUser: UserState = {
    username: getUser(),
    token: getToken(),
    role: getRole(),
}

const SET_USER_INFO = 'SET_USER_INFO'

const SET_USER_LOGOUT = 'SET_USER_LOGOUT'

export const setUserInfo: (user: UserState) => IAction<UserState> = (user) => ({
    type: SET_USER_INFO,
    payload: user,
})

export const logout: ()=> IAction<null> = () => ({
    type: SET_USER_LOGOUT,
    payload: null,
})

const userReducer: Reducer<UserState, IAction<any>> = (state = defaultUser, action: IAction<any>) => {
    const { type, payload } = action
    switch (type) {
        case SET_USER_INFO:
            localSetUserInfo(payload)
            return {
                ...payload,
            }
        case SET_USER_LOGOUT:
            localRemoveUserInfo()
            return {
                ...defaultUser,
            }
        default:
            return state
    }
}

export default userReducer
