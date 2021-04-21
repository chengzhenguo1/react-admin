export interface IGetParam {
    pageNumber: number
    pageSize: number
    name?: string
    status?: boolean
}

export interface IList<T> {
    data: {
        data: T[]
        total: number
    }
    message: string
}
