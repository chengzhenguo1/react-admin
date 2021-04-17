import { InputProps } from 'antd'
import React, { memo } from 'react'
import { formProps } from '../LoginItem'
import FormInput from '../../FromInput/input'
import {
 ItemConfig, ItemProps, radioItem, TextAreaProps, 
} from '../type'

interface LoginItemType {
    Name: React.FC<ItemProps>
    Number: React.FC<ItemProps>
    Status: React.FC<ItemProps>
    Content: React.FC<ItemProps>
}

interface DepartmentItemConfig extends ItemConfig{
    label: string
    inputProps: InputProps | TextAreaProps
    radioItem?: radioItem // 单选框
}

const config: {[key in keyof LoginItemType]: DepartmentItemConfig} = {
    Name: {
        name: 'name',
        label: '部门名称',
        rules: [{ required: true, message: '请输入部门名称！' }],
        inputProps: {
            placeholder: '部门名称',
            type: 'text',
        },
    }, 
    Number: {
        name: 'number',
        label: '人员数量',
        rules: [{ required: true, message: '请选择人员数量！' }],
        inputProps: {
            placeholder: '部门名称',
            type: 'number',
            min: 1,
            max: 100,
        },
    },
    Status: {
        name: 'status',
        label: '禁启用',
        inputProps: {
            type: 'radio',
        },
        radioItem: [
            {
                value: false,
                text: '禁用',
            },
            {
                value: true,
                text: '启用',
            },
        ],
    },
    Content: {
        name: 'content',
        label: '描述',
        inputProps: {
            type: 'area',
            rows: 10,
        },
    },
}

function Name(props: ItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.Name}
          {...props} />
)
}

function Number(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Number}
          {...props} />
)
}

function Status(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Status}
          {...props} />
)
}

function Content(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Content}
          {...props} />
)
}

const DepartmentItem: LoginItemType = {
    Name: memo(Name),
    Number: memo(Number),
    Status: memo(Status),
    Content: memo(Content),
}

export default DepartmentItem
