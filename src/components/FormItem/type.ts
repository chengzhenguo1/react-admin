import { FormInstance, InputProps } from 'antd';
import { Rule } from 'antd/lib/form';

export interface ItemConfig {
    name: string
    rules?: Rule[]
    inputProps: InputProps
}

export interface ItemProps {
    form: FormInstance
}

/* 文本域 */
export type TextAreaProps = InputProps & {rows?: number, cols?: number}

/* 单选框 */
export type radioItem = {value: any, text: string}[] 
