import axios from '@src/utils/request'
import type { AddDepartmentProps, DepartmentData, IDepartment } from './types/department'

type AddDepartmentFn = (data: AddDepartmentProps)=> Promise<{message: string}>
type GetDepartmentListFn = (data: {name:string, pageNumber: number, pageSize : number})=> Promise<IDepartment>
type GetDepartmentListAllFn = ()=> Promise<DepartmentData[]>
type GetDepartmentDetailedFn = (id: string)=> Promise<any>
type SetDepartmentStatusFn = (id: string, status: boolean)=> Promise<{message: string}>
type DeleteDepartmentFn = (id: string)=> Promise<{message: string}>

/* 新增部门 */
const addDepartment: AddDepartmentFn = (data) => axios({
        url: '/department/add/',
        method: 'POST',
        data,
})

/* 获取部门列表 */
const getDepartmentList: GetDepartmentListFn = async (data) => {
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
        url: '/department/add/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res
}

/* 部门修改 */
const editDepartment: AddDepartmentFn = (data) => axios({
    url: '/department/add/',
    method: 'POST',
    data,
})

/* 部门禁启用 */
const setDepartmentStatus: SetDepartmentStatusFn = (id, status) => axios({
        url: '/department/status/',
        method: 'POST',
        data: {
            id,
            status,
        },
})

/* 删除部门 */
const deleteDepartment: DeleteDepartmentFn = (id) => axios({
        url: '/department/delete/',
        method: 'POST',
        data: {
            id,
        },
})

export default {
    addDepartment,
    getDepartmentList,
    getDepartmentListAll,
    getDepartmentDetailed,
    editDepartment,
    setDepartmentStatus,
    deleteDepartment,
}
