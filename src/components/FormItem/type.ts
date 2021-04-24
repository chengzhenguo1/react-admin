import { FormInstance, InputProps } from 'antd'
import { FormItemProps, Rule } from 'antd/lib/form'

export const formProps: FormItemProps = {
    hasFeedback: true,
    children: null,
}
export interface ItemConfig {
    name: string
    rules?: Rule[]
    label?: string
    inputProps: InputProps
    rows?: number // 富文本行数
    cols?: number
    optionItem? : optionItemType
    format?: string // 格式化时间
    picker?: 'time' | 'date' | 'month' | 'week' | 'quarter' | 'year' | undefined
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

export type optionItemType = { value: any, text: string, [item: string]: any}[] 
