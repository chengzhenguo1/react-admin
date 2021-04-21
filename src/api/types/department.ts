export interface IDepartmentData {
    id: string
    name: string
    number: number
    status: boolean
    content: string
}

/* 新增参数 / 详情反参 */
export interface IDepartmentProps {
    name: string
    number: number
    status: true
    content: true
}
