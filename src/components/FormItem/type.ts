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
    optionItem? : OptionItemType
    format?: string // 格式化时间
    picker?: 'time' | 'date' | 'month' | 'week' | 'quarter' | 'year' | undefined
    loading?: boolean
    width?: number
    height?: number
    module?: 'register' | 'login'
    [params: string]: any
}

export interface ItemProps {
    form: FormInstance
    optionItem? : OptionItemType
    loading?: boolean
    label?: string 
    [params: string]: any
}

export type OptionItemType = { value: any, text: string, [item: string]: any}[] 
