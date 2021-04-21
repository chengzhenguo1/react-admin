import axios from '@src/utils/request'
import { IGetParam, IList } from './types'
import type { IStaffAdd, IStaff } from './types/staff'

type AddStaffFn = (data: IStaffAdd)=> Promise<{message: string}>
type GetStaffListFn = (data: IGetParam)=> Promise<IList<IStaff>>
type GetStaffDetailFn = (id: string)=> Promise<IStaffAdd>
type SetStaffStatusFn = (id: string, status: boolean)=> Promise<{message: string}>
type EditStaffFn = (data:any)=> Promise<any>
type DeleteStaffFn = (id: string)=> Promise<any>

const getstaffList: GetStaffListFn = async (data) => {
    const res = await axios({
        url: '/staff/list/',
        method: 'POST',
        data,
    })
    return res
}

const staffAdd: AddStaffFn = async (data) => {
    const res = await axios({
        url: '/staff/add/',
        method: 'POST',
        data,
    })
    return res
}

const getstaffDetail: GetStaffDetailFn = async (id) => {
    const res = await axios({
        url: '/staff/detailed/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res.data
}

const setstaffStatus: SetStaffStatusFn = async (id, status) => {
    const res = await axios({
        url: '/staff/status/',
        method: 'POST',
        data: {
            id,
            status,
        },
    })
    return res
}

const editstaff: EditStaffFn = async (data) => {
    const res = await axios({
        url: '/staff/edit/',
        method: 'POST',
        data,
    })
    return res
}

const deleteStaff: DeleteStaffFn = async (id) => {
    const res = await axios({
        url: '/staff/delete/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res
}

export default {
    staffAdd,
    getstaffList,
    editstaff,
    setstaffStatus,
    getstaffDetail,
    deleteStaff,
}
