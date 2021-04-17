import axios from '@src/utils/request'
import type { IStaffAdd } from './types/staff'

type StaffAddFn = (data: IStaffAdd)=> Promise<{message: string}>

const staffAdd: StaffAddFn = (data) => axios({
        url: '/staff/add/',
        method: 'POST',
        data,
})

export default {
    staffAdd,
}
