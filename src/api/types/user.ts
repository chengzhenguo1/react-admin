export interface IUserList {
    data: {
        data: User[]
        total: number
    } | IUserDeatil
    message: string
}

export interface AddFormParam {
    username: string
    truename: string
    password: string
    status: boolean
    phone: string
    role: string
}

export interface EditFormParam extends AddFormParam {
    id: string
}

interface User extends IUserDeatil{
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
