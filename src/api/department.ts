import axios from '@src/utils/request'
import { IGetParam, IList } from './types'
import type { IDepartment, IDepartmentData } from './types/department'

type AddOrEditDepartmentFn = (data: IDepartmentData)=> Promise<{message: string}>
type GetDepartmentListFn = (data: IGetParam)=> Promise<IList<IDepartment & {id: string}>>
type GetDepartmentListAllFn = ()=> Promise<IDepartment[]>
type GetDepartmentDetailedFn = (id: string)=> Promise<IDepartment & {content: string}>
type SetDepartmentStatusFn = (id: string, status: boolean)=> Promise<{message: string}>
type DeleteDepartmentFn = (id: string)=> Promise<{message: string}>

/* 新增或者编辑部门 */
const addOrEditDepartment: AddOrEditDepartmentFn = async (data) => {
    const path = data?.id ? 'edit' : 'add'
    const res = await axios({
        url: `/department/${path}/`,
        method: 'POST',
        data,
    })
    return res
}

/* 获取部门列表 */
const getDepartmentList: GetDepartmentListFn = async (data = { pageNumber: 1, pageSize: 10 }) => {
    const res = await axios({
        url: '/department/list/',
        method: 'POST',
        data,
    })
    return res
}

/* 获取全部部门 */
const getDepartmentListAll: GetDepartmentListAllFn = async () => {
    const res = await axios({
        url: '/department/listAll/',
        method: 'POST',
    })
    return res.data.data
} 

/* 获取部门详情 */
const getDepartmentDetailed: GetDepartmentDetailedFn = async (id) => {
   const res = await axios({
        url: '/department/detailed/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res.data
}

/* 部门禁启用 */
const setDepartmentStatus: SetDepartmentStatusFn = async (id, status) => {
    const res = await axios({
        url: '/department/status/',
        method: 'POST',
        data: {
            id,
            status,
        },
    })
    return res
}

/* 删除部门 */
const deleteDepartment: DeleteDepartmentFn = async (id) => {
    const res = await axios({
        url: '/department/delete/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res
}

export default {
    addOrEditDepartment,
    getDepartmentList,
    getDepartmentDetailed,
    setDepartmentStatus,
    deleteDepartment,
    getDepartmentListAll,
}
