import React, { memo } from 'react'
import { formProps } from '../LoginItem'
import FormInput from '../../FromInput/input'
import { ItemConfig, ItemProps } from '../type'

interface JobItemType {
    Name: React.FC<ItemProps>
    JobName: React.FC<ItemProps>
    Status: React.FC<ItemProps>
    SearchStatus: React.FC<ItemProps>
    Content: React.FC<ItemProps>
}

const config: {[key in keyof JobItemType]: ItemConfig} = {
    Name: {
        name: 'parentId',
        label: '部门',
        rules: [{ required: true, message: '请选择部门名称！' }],
        inputProps: {
            placeholder: '部门名称',
            type: 'select',
        },
    },
    JobName: {
        name: 'jobName',
        label: '职位名称',
        rules: [{ required: true, message: '请输入职位名称！' }],
        inputProps: {
            placeholder: '职位名称',
            type: 'text',
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
    SearchStatus: {
        name: 'status',
        label: '禁启用',
        inputProps: {
            type: 'select',
        },
        optionItem: [
            {
                id: false,
                name: '禁用',
            },
            {
                id: true,
                name: '启用',
            },
        ],
    },
    Content: {
        name: 'content',
        label: '描述',
        inputProps: {
            type: 'area',
        },
        rows: 10,
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

function JobName(props: ItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.JobName}
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

function SearchStatus(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.SearchStatus}
          {...props} />
)
}

const JobItem: JobItemType = {
    Name: memo(Name),
    JobName: memo(JobName),
    Status: memo(Status),
    Content: memo(Content),
    SearchStatus: memo(SearchStatus),
}

export default JobItem
