export interface IJob {
    data: {
        data: Jobs[]
        total: number
    } 
    message: string
    resCode: number
}

export interface IJobDeatil{
    data: DataDeatil[]
    resCode: number
    total: number
    message: string
}

interface Job {
    jobId: string
    jobName: string
    status: boolean
    content: string
}

export interface Jobs extends Job{
    name: string
}

export interface DataDeatil extends Job {
    parentId: string
}
