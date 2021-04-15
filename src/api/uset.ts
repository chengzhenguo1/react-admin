import axios from '@src/utils/request'
import {
 IUserList, AddFormParam, EditFormParam, IUserDeatil, 
} from './types/user'

type GetUserListFn = (page: {pageNumber: number, pageSize: number})=>Promise<IUserList>
type UserAddFn = (data: AddFormParam)=> Promise<{message: string}>
type UserEditFn = (data: EditFormParam)=> Promise<{message: string}>
type SetUserStatusFn = (id: string, status: boolean)=> Promise<{message: string}>
type UserDeleteFn = (id: string)=> Promise<{message: string}>
type GetUserDetailFn = (id: number)=> Promise<IUserDeatil>

/* 获取用户列表 / 全部 */
const getUserList: GetUserListFn = async (page) => {
    const { pageNumber, pageSize } = page
    const res = axios({
        url: '/user/list/',
        method: 'POST',
        data: {
            pageNumber,
            pageSize,
        },
    })
    return res
}

/* 用户添加 */
const userAdd: UserAddFn = (data) => axios({
        url: '/user/add/',
        method: 'POST',
        data,
})

/* 用户修改 */
const userEdit: UserEditFn = (data) => axios({
        url: '/user/edit/',
        method: 'POST',
        data,
})

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
        url: '/user/detail',
        method: 'POST',
        data: {
            id,
        },
    })
    return res
}

export default {
    getUserList,
    userAdd,
    userEdit,
    setUserStatus,
    userDelete,
    getUserDetail,
}
