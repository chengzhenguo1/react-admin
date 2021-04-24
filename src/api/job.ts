import axios from '@src/utils/request'
import type { IJobDeatil, IJob } from '../api/types/job'
import { IGetParam, IList } from './types'

type JobAddOrEditFn = (data: IJob & {content: string, parentId?: string})=> Promise<{message: string}>
type GetJobListFn = (data?: IGetParam)=> Promise<IList<IJob>>
type JobListAllFn = ()=> Promise<IJob[]>
type JobDetailFn = (id: number | string)=> Promise<IJobDeatil>
type SetJobStatusFn = (id: number, status: boolean)=> Promise<{message: string}>
type JobDeleteFn = (id:string)=> Promise<{message: string}>

/* 新增或者编辑添加 */
const jobAddOrEdit: JobAddOrEditFn = async (data) => {
   const path = data?.jobId ? 'edit' : 'add'
   const res = await axios({
        url: `/job/${path}/`,
        method: 'POST',
        data,
    })
    return res
}

/* 职位列表 */
const getJobList: GetJobListFn = async (data) => {
   const res = await axios({
        url: '/job/list/',
        method: 'POST',
        data,
    })
    return res
}

/* 职位列表 / 全部列表 */
const getJobAllList: JobListAllFn = async () => {
    const res = await axios({
         url: '/job/listAll/',
         method: 'POST',
     })
     return res.data.data
 }

/* 职位详情 */
const jobDetail: JobDetailFn = async (id) => {
    const res = await axios({
        url: '/job/detailed/',
        method: 'POST',
        data: {
            id,
        },
    })
    return res.data
}

/* 职位禁启用 */
const setJobStatus : SetJobStatusFn = (id, status) => axios({
        url: '/job/status/',
        method: 'POST',
        data: {
            id,
            status,
        },
})

/* 职位删除 */
const jobDelete: JobDeleteFn = (id) => axios({
        url: '/job/delete/',
        method: 'POST',
        data: {
            id,
        },
})

export default {
    jobAddOrEdit,
    getJobList,
    getJobAllList,
    jobDetail,
    setJobStatus,
    jobDelete,
}
