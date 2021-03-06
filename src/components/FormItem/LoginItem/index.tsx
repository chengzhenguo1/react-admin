import {
 CaptchaRule, ConfirmRule, PassWordRule, UserNameRule, 
} from '@src/constants/validate'
import { FormItemProps } from 'antd'
import React, { memo } from 'react'
import { UserOutlined, LockOutlined, CreditCardOutlined } from '@ant-design/icons'
import FormInput from '../../FromInput/input'
import { formProps, ItemConfig, ItemProps } from '../type'

interface LoginItemType {
    UserName: React.FC<LoginItemProps>
    PassWord: React.FC<LoginItemProps>
    Confirm: React.FC<LoginItemProps>
    Code: React.FC<LoginItemProps>
}

const config: {[key in keyof LoginItemType]: ItemConfig} = {
    UserName: {
        name: 'username',
        rules: UserNameRule,
        inputProps: {
            prefix: <UserOutlined />,
            placeholder: '用户名',
            type: 'text',
        },
    }, 
    PassWord: {
        name: 'password',
        rules: PassWordRule,
        inputProps: {
            prefix: <LockOutlined />,
            placeholder: '密码',
            type: 'password',
            /* visibilityToggle: true, */
        },
    },
    Confirm: {
        name: 'cpassword',
        rules: ConfirmRule,
        inputProps: {
            prefix: <LockOutlined />,
            placeholder: '重复密码',
            type: 'password',
           /*  visibilityToggle: true, */
        },
    },
    Code: {
        name: 'code',
        rules: CaptchaRule,
        inputProps: {
            prefix: <CreditCardOutlined />,
            placeholder: '验证码',
            type: 'code',
        },
    },
}

interface LoginItemProps extends ItemProps {
    // eslint-disable-next-line react/require-default-props
    module?: 'register' | 'login'
}

function UserName(props: LoginItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.UserName}
          {...props} />
)
}

function PassWord(props: LoginItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.PassWord}
          {...props} />
)
}

function Confirm(props: LoginItemProps) {
  return (
      <FormInput
        formProps={formProps}
        {...config.Confirm}
        {...props} />
 )
}

function Code(props: LoginItemProps) {
  return (
      <FormInput
        formProps={{ children: null }}
        {...config.Code}
        {...props} />
)
}

const LoginItem: LoginItemType = {
    UserName: memo(UserName),
    PassWord: memo(PassWord),
    Confirm: memo(Confirm),
    Code: memo(Code),
}

export default LoginItem
