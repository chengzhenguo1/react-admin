export interface IJobDeatil{
    data: DataDeatil[]
    resCode: number
    total: number
    message: string
}

export interface IJob {
    jobId: string
    jobName: string
    status: boolean
}

export interface DataDeatil extends IJob {
    parentId: string
}
