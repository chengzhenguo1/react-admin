import React, { memo } from 'react'
import { StatusText } from '@src/assets/data'
import FormInput from '../../FromInput/input'
import { formProps, ItemConfig, ItemProps } from '../type'

interface JobItemType {
    Name: React.FC<ItemProps>
    Number: React.FC<ItemProps>
    Status: React.FC<ItemProps>
    Content: React.FC<ItemProps>
}

const config: {[key in keyof JobItemType]: ItemConfig} = {
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
        optionItem: StatusText,
    },
    Content: {
        name: 'content',
        label: '描述',
        rows: 10,
        inputProps: {
            type: 'textArea',
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

const DepartmentItem: JobItemType = {
    Name: memo(Name),
    Number: memo(Number),
    Status: memo(Status),
    Content: memo(Content),
}

export default DepartmentItem
