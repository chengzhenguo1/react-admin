export interface IJob {
    data: {
        data: Jobs[]
        total: number
    } | DataDeatil
    message: string
    resCode: number
}

/* export interface IJobDeatil{
    data: DataDeatil[]
    resCode: number
    total: number
    message: string
} */

interface Job {
    jobId: string
    jobName: string
    status: boolean
}

interface Jobs extends Job{
    name: string
}

export interface DataDeatil extends Job {
    parentId: string
    content: string
}
