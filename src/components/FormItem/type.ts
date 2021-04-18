import { FormInstance, InputProps } from 'antd';
import { Rule } from 'antd/lib/form';

export interface ItemConfig {
    name: string
    rules?: Rule[]
    label?: string
    inputProps: InputProps
    rows?: number
    cols?: number
    radioItem?: radioItemType // 单选框列表
    optionItem? : optionItemType
    width?: number
    height?: number
    module?: 'register' | 'login'
}

export interface ItemProps {
    form: FormInstance
    optionItem? : optionItemType
}
/* 下拉框 */
export type optionItemType = {id: any, name: string}[] 

/* 单选框 */
export type radioItemType = {value: any, text: string}[] 
