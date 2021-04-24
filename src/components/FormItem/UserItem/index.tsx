import {
    ConfirmPassWord,
 ConfirmRule, PASSWORDREG, PassWordRule, PHONEREG, UserNameRule, 
} from '@src/constants/validate'
import React, { memo } from 'react'
import { UserStatus } from '@src/assets/data'
import FormInput from '../../FromInput/input'
import { formProps, ItemConfig, ItemProps } from '../type'

interface UserItemType {
    UserName: React.FC<ItemProps>
    Truename: React.FC<ItemProps>
    PassWord: React.FC<IsRequiredProps>
    Confirm: React.FC<IsRequiredProps>
    Status: React.FC<ItemProps>
    Phone: React.FC<ItemProps>
    Role: React.FC<ItemProps>
}

const config: {[key in keyof UserItemType]: ItemConfig} = {
    UserName: {
        name: 'username',
        label: '用户名',
        rules: UserNameRule,
        inputProps: {
            placeholder: '用户名',
            type: 'text',
        },
    }, 
    Truename: {
        name: 'truename',
        label: '真实名称',
        rules: [{ required: true, message: '请输入真实名称' }],
        inputProps: {
            placeholder: '真实名称',
            type: 'text',
        },
    }, 
    PassWord: {
        name: 'password',
        label: '密码',
        rules: [{ pattern: PASSWORDREG, message: '输入的密码不合规范！' }],
        inputProps: {
            placeholder: '密码',
            type: 'password',
        },
    },
    Confirm: {
        name: 'cpassword',
        label: '重复密码',
        rules: [ConfirmPassWord],
        inputProps: {
            placeholder: '重复密码',
            type: 'password',
        },
    },
    Status: {
        name: 'status',
        label: '禁启用',
        rules: [{ required: true, message: '请选择' }],
        inputProps: {
            type: 'radio',
        },
        optionItem: UserStatus,
    },
    Phone: {
        name: 'phone',
        label: '手机号',
        rules: [{ required: true, message: '请输入手机号' }, { pattern: PHONEREG, message: '请输入合法的手机号' }],
        inputProps: {
            type: 'text',
        },
    },
    Role: {
        name: 'role',
        label: '角色',
        rules: [{ required: true, message: '请分配角色' }],
        inputProps: {
            type: 'radio',
        },
    },
}

interface IsRequiredProps extends ItemProps {
    // eslint-disable-next-line react/require-default-props
    isRequired?: boolean
}

function UserName(props: ItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.UserName}
          {...props} />
)
}

function Truename(props: ItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.Truename}
          {...props} />
)
}

function PassWord(props: IsRequiredProps) {
    const { isRequired } = props
    return (
        <FormInput
          formProps={formProps}
          {...config.PassWord}
          {...props}
          rules={isRequired ? PassWordRule : config.PassWord.rules} />
)
}

function Confirm(props: IsRequiredProps) {
    const { isRequired } = props
    return (
        <FormInput
          formProps={formProps}
          {...config.Confirm}
          {...props}
          rules={isRequired ? ConfirmRule : config.Confirm.rules} />
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

function Phone(props: ItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.Phone}
          {...props} />
)
}

function Role(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Role}
          {...props} />
)
}

const UserItem: UserItemType = {
    UserName: memo(UserName),
    Truename: memo(Truename),
    PassWord: memo(PassWord),
    Confirm: memo(Confirm),
    Status: memo(Status),
    Phone: memo(Phone),
    Role: memo(Role),
}

export default UserItem
