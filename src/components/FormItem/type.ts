import { FormInstance, InputProps } from 'antd'
import { Rule } from 'antd/lib/form'

export interface ItemConfig {
    name: string
    rules?: Rule[]
    label?: string
    inputProps: InputProps
    rows?: number // 富文本行数
    cols?: number
    radioItem?: radioItemType // 单选框列表
    optionItem? : optionItemType // 下拉框选项
    loading?: boolean
    width?: number
    height?: number
    module?: 'register' | 'login'
}

export interface ItemProps {
    form: FormInstance
    optionItem? : optionItemType
    loading?: boolean
}
/* 下拉框 */
export type optionItemType = {value: any, text: string}[] 

/* 单选框 */
export type radioItemType = {value: any, text: string}[] 
