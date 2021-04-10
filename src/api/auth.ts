import axios from '@src/utils/request'
import { IUser, ICode, IParam } from './types/auth'

type LoginFn = (data: IParam) => Promise<IUser>
type GetSmsFn = (data: {username: string, module: 'login' | 'register'}) => Promise<ICode>
type RegisterFn = (data: IParam) => Promise<string>

const login: LoginFn = async (data) => {
    const res = await axios({
        url: '/login/',
        method: 'POST',
        data,
    })
    return res.data
}

const register: RegisterFn = async (data) => {
    const res = await axios({
        url: '/register/',
        method: 'POST',
        data,
    })
    return res.message
}

const getSms: GetSmsFn = async (data) => {
    const res = await axios({
        url: '/getSms/',
        method: 'POST',
        data,
    })
    return res.message
}

export default {
    login,
    register,
    getSms,
}
