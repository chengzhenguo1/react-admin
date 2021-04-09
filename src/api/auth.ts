/*
 * @Author: your name
 * @Date: 2021-04-09 22:46:27
 * @LastEditTime: 2021-04-09 23:54:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-jira\src\api\auth.ts
 */
import axios from '@src/utils/request'
import { User } from './types/auth'

type LoginFn = (data: {username: string, password: string, code: string}) => Promise<User>

const login: LoginFn = async (data) => {
    const res = await axios({
        url: '/login/',
        method: 'POST',
        data,
    })
    return res.data
}

export default {
    login,
}
