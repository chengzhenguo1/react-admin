import React from 'react'
import {
 education, face, JobStatus, nation, UserStatus, 
} from '@src/assets/data'
import { CARDREG, PHONEREG } from '@src/constants/validate'
import { ItemConfig, ItemProps } from '../type'

export interface StaffItemType {
    Name: React.FC<ItemProps>
    Sex: React.FC<ItemProps>
    FaceImg: React.FC<ItemProps>
    CardId: React.FC<ItemProps>
    DiplomaImg: React.FC<ItemProps>
    Birthday: React.FC<ItemProps>
    Phone: React.FC<ItemProps>
    Nation: React.FC<ItemProps>
    Political: React.FC<ItemProps>
    School: React.FC<ItemProps>
    Education: React.FC<ItemProps>
    Major: React.FC<ItemProps>
    Wechat: React.FC<ItemProps>
    Email: React.FC<ItemProps>
    JobId: React.FC<ItemProps>
    DepartmenId: React.FC<ItemProps>
    JobStatusDate: React.FC<ItemProps>
    JobStatus: React.FC<ItemProps>
    CompanyEmail: React.FC<ItemProps>
    Introduce: React.FC<ItemProps>
    Status: React.FC<ItemProps>
    JobEntryDate: React.FC<ItemProps>
    JobFormalDate: React.FC<ItemProps>
    JobQuitDate: React.FC<ItemProps>
}

export const config: {[key in keyof StaffItemType]: ItemConfig} = {
    Name: {
        name: 'name',
        rules: [{ required: true, message: '请输入姓名' }],
        label: '姓名',
        inputProps: {
            placeholder: '用户名',
            type: 'text',
        },
    }, 
    Sex: {
        name: 'sex',
        rules: [{ required: true, message: '请选择性别' }],
        label: '性别',
        optionItem: [
            {
                value: true,
                text: '男',
            },
            {
                value: false,
                text: '女',
            },
        ],
        inputProps: {
            type: 'radio',
        },
    },
    FaceImg: {
        name: 'face_img',
        label: '头像',
        inputProps: {
            type: 'file',
        },
    },
    CardId: {
        name: 'card_id',
        label: '身份证号',
        rules: [{ pattern: CARDREG, message: '请输入合法的身份证' }],
        inputProps: {
            placeholder: '身份证',
            type: 'text',
        },
    },
    DiplomaImg: {
        name: 'diploma_img',
        label: '毕业证',
        inputProps: {
            placeholder: '毕业证',
            type: 'file',
        },
    },
    Birthday: {
        name: 'birthday',
        label: '出生年月',
        format: 'YYYY/MM',
        inputProps: {
            placeholder: '出生年月',
            type: 'month',
        },
    },
    Phone: {
        name: 'phone',
        label: '手机',
        rules: [{ pattern: PHONEREG, message: '请输入合法的手机号' }],
        inputProps: {
            placeholder: '手机号',
            type: 'text',
        },
    },
    Nation: {
        name: 'nation',
        label: '民族',
        rules: [{ required: true, message: '请选择民族' }],
        inputProps: {
            type: 'select',
        },
        optionItem: nation,
    },
    Political: {
        name: 'political',
        label: '政治面貌',
        rules: [{ required: true, message: '请选择政治面貌' }],
        inputProps: {
            type: 'select',
        },
        optionItem: face,
    },
    School: {
        name: 'school',
        label: '毕业院校',
        inputProps: {
            type: 'text',
        },
    },
    Education: {
        name: 'education',
        label: '学历',
        inputProps: {
            type: 'select',
        },
        optionItem: education,
    },
    Major: {
        name: 'major',
        label: '专业',
        inputProps: {
            type: 'text',
        },
    },
    Wechat: {
        name: 'wechat',
        label: '微信号',
        inputProps: {
            type: 'text',
        },
    },
    Email: {
        name: 'email',
        label: '个人邮箱',
        rules: [{ type: 'email', message: '请输入合法的邮箱' }],
        inputProps: {
            type: 'text',
        },
    },
    JobId: {
        name: 'job_id',
        label: '职位',
        rules: [{ required: true, message: '请选择职位' }],
        inputProps: {
            type: 'select',
        },
    },
    DepartmenId: {
        name: 'departmen_id',
        label: '部门',
        rules: [{ required: true, message: '请选择部门' }],
        inputProps: {
            type: 'select',
        },
    },
    JobStatusDate: {
        name: 'job_status_date',
        label: '工作时间',
        rules: [{ required: true, message: '请选择工作时间' }],
        format: 'DD/MM/YYYY',
        picker: 'date',
        inputProps: {
            type: 'month',
            placeholder: '工作时间',
        },
        optionItem: nation,
    },
    JobStatus: {
        name: 'job_status',
        label: '职位状态',
        rules: [{ required: true, message: '请选择职位状态' }],
        inputProps: {
            type: 'radio',
        },
        optionItem: JobStatus,
    },
    CompanyEmail: {
        name: 'company_email',
        label: '公司邮箱',
        rules: [{ type: 'email', message: '公司邮箱不符合规范' }],
        inputProps: {
            type: 'text',
        },
    },
    Status: {
        name: 'status',
        label: '禁启用',
        rules: [{ required: true, message: '请选择禁启用' }],
        inputProps: {
            type: 'radio',
        },
        optionItem: UserStatus,
    },
    JobEntryDate: {
        name: 'job_entry_date',
        label: '入职日期',
        rules: [{ required: true, message: '请选择入职日期' }],
        inputProps: {
            type: 'month',
        },
    },
    JobFormalDate: {
        name: 'job_formal_date',
        label: '转正日期',
        rules: [{ required: true, message: '请选择转正日期' }],
        inputProps: {
            type: 'month',
        },
    },
    JobQuitDate: {
        name: 'job_quit_date',
        label: '离职日期',
        rules: [{ required: true, message: '请选择离职日期' }],
        inputProps: {
            type: 'month',
        },
    },
    Introduce: {
        name: 'introduce',
        label: '描述',
        inputProps: {
            type: 'editor',
        },
    },
}
