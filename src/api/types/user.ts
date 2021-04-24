export interface FormParam {
    username: string
    truename: string
    password: string
    status: boolean
    phone: string
    role: string
}

export interface User extends IUserDeatil{
    role_str: string
}

export interface IUserDeatil {
    id: string
    username: string
    truename: string
    phone: string
    status: boolean
    role: string
}
