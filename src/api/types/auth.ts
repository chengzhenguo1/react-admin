import { UserState } from '@src/store/module/user'

/* 登录返回数据 */
export interface IUser{ 
    message: string
    data: UserState
}

/* 登录/注册参数列表 */
export interface IParam {
    username: string
    password: string
    code: string
}
