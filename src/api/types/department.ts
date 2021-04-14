/* 列表反参 */
export interface IDepartment {
    data: IDepartmentData[]
    total: number
    message: string
}

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

/* 编辑参数 */
export interface IEditDepartmentParams extends IDepartmentProps{
    id?: number
}
