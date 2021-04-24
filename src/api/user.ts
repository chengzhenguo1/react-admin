import axios from '@src/utils/request'
import { IList, IGetParam } from './types'
import { User, FormParam, IUserDeatil } from './types/user'

type GetUserListFn = (page: IGetParam)=>Promise<IList<User>>
type UserAddOrEditFn = (data: FormParam & {id?: string})=> Promise<{message: string}>
type SetUserStatusFn = (id: string, status: boolean)=> Promise<{message: string}>
type UserDeleteFn = (id: string)=> Promise<{message: string}>
type GetUserDetailFn = (id: string)=> Promise<IUserDeatil>

/* 获取用户列表 / 全部 */
const getUserList: GetUserListFn = async (data) => {
    const res = await axios({
        url: '/user/list/',
        method: 'POST',
        data,
    })
    return res
}

/* 用户编辑或添加 */
const userAddOrEdit: UserAddOrEditFn = (data) => {
    const path = data?.id ? 'edit' : 'add'
    return axios({
        url: `/user/${path}/`,
        method: 'POST',
        data,
    })
}
/* 用户禁启用 */
const setUserStatus: SetUserStatusFn = (id, status) => axios({
        url: '/user/status/',
        method: 'POST',
        data: {
            id,
            status,
        },
})

/* 用户删除 */
const userDelete: UserDeleteFn = (id) => axios({
        url: '/user/delete/',
        method: 'POST',
        data: {
            id,
        },
})

/* 用户详情 */
const getUserDetail: GetUserDetailFn = async (id) => {
    const res = await axios({
        url: '/user/detailed/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res.data
}

export default {
    getUserList,
    userAddOrEdit,
    userDelete,
    setUserStatus,
    getUserDetail,
}
