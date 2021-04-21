import axios from '@src/utils/request'
import type {
 IJob, DataDeatil, IJobDeatil, Job, 
} from '../api/types/job'
import { PageParam } from './types'

export interface ListPageParam extends PageParam{
    name?: string
    status?: boolean
}

type JobAddFn = (data: {jobName: string, parentId: number, status: boolean, content: string})=> Promise<{message: string}>
type GetJobListFn = (data?: ListPageParam)=> Promise<IJob>
type JobListAllFn = ()=> Promise<Job[]>
type JobDetailFn = (id: number | string)=> Promise<IJobDeatil>
type JobEaitFn = (data: DataDeatil)=> Promise<{message: string}>
type SetJobStatusFn = (id: number, status: boolean)=> Promise<{message: string}>
type JobDeleteFn = (id:string)=> Promise<{message: string}>

/* 职位添加 */
const jobAdd: JobAddFn = (data) => axios({
        url: '/job/add/',
        method: 'POST',
        data,
})

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

/* 职位修改 */
const jobEdit: JobEaitFn = (data) => axios({
        url: '/job/edit/',
        method: 'POST',
        data,
})

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
    jobAdd,
    getJobList,
    getJobAllList,
    jobDetail,
    jobEdit,
    setJobStatus,
    jobDelete,
}
