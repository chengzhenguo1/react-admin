/* 登录返回数据 */
export interface IUser{ 
    message: string
    data: User
}

interface User {
    username: string
    token: string
    role: string
}

/* 登录/注册参数列表 */
export interface IParam {
    username: string
    password: string
    code: string
}
