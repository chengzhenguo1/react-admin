/* 登录返回数据 */
export interface IUser{ 
    username: string
    token: string
}

/* 登录/注册参数列表 */
export interface IParam {
    username: string
    password: string
    code: string
}
