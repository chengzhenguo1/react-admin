import axios from '@src/utils/request'
import type { IUser, IParam } from './types/auth'

type LoginFn = (data: IParam) => Promise<IUser>
type GetSmsFn = (data: {username: string, module: 'login' | 'register'}) => Promise<{message: string}>
type RegisterFn = (data: IParam) => Promise<{message: string}>
type GetRoleFn = () => Promise<{label: string, value: string}[]>

const login: LoginFn = (data) => axios({
	url: '/login/',
	method: 'POST',
	data,
})

const register: RegisterFn = (data) => axios({
	url: '/register/',
	method: 'POST',
	data,
})

const getSms: GetSmsFn = (data) => axios({
	url: '/getSms/',
	method: 'POST',
	data,
})

const getRole: GetRoleFn = async () => {
	const res = await axios({
		url: '/role/',
		method: 'POST',
	})
	return res.data
}

export default {
    login,
    register,
    getSms,
	getRole,
}
