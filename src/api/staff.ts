import axios from '@src/utils/request'
import { IGetParam, IList } from './types'
import type { IStaffAdd, IStaff } from './types/staff'

type AddOrEditStaffFn = (data: IStaffAdd & {id?: string})=> Promise<string>
type GetStaffListFn = (data: IGetParam)=> Promise<IList<IStaff>>
type GetStaffDetailFn = (id: string)=> Promise<IStaffAdd>
type SetStaffStatusFn = (id: string, status: boolean)=> Promise<string>
type DeleteStaffFn = (id: string)=> Promise<any>

const getstaffList: GetStaffListFn = async (data) => {
    const res = await axios({
        url: '/staff/list/',
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

const addOrEditStaff: AddOrEditStaffFn = async (data) => {
    const path = data.id ? 'edit' : 'add'
    const res = await axios({
        url: `/staff/${path}/`,
        method: 'POST',
        data,
    })
    return res.message
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
    return res.message
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
    getstaffDetail,
    getstaffList,
    addOrEditStaff,
    setstaffStatus,
    deleteStaff,
}
