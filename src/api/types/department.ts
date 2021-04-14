export interface IDepartment {
    data: DepartmentData[]
    total: number
    message: string
}

export interface DepartmentData {
    id: string
    name: string
    number: number
    status: boolean
    content: string
}

export interface AddDepartmentProps {
    name: string
    number: number
    status: true
    content: true
}
