import React, { memo, useState } from 'react'
import sha256 from 'crypto-js/sha256'
import { useAsyncFn, useKey } from 'react-use'

import { IParam } from '@src/api/types/auth'
import authApi from '@src/api/auth'
import {
 CaptchaRule, ConfirmRule, PassWordRule, UserNameRule, 
} from '@src/constants/validate'

import {
 Form, Input, Button, Row, Col, message, 
} from 'antd'
import { UserOutlined, LockOutlined, CreditCardOutlined } from '@ant-design/icons'
import Captcha from '@src/components/Captcha'

interface IProps {
  toggleState: ()=> void
}

interface IValues extends IParam{
  cpassword: string
}

const RegisterForm: React.FC<IProps> = memo(({ toggleState }) => {
    const [userName, setuserName] = useState('')

    const [{ loading }, registerFn] = useAsyncFn(authApi.register)

    const onRegister = async (values: IValues) => {
        const { cpassword, ...user } = { ...values }

        const res = await registerFn({ username: user.username, password: sha256(user.password).toString(), code: user.code })

         if (res) {
          message.success(res.message)
          toggleState()
        }
    }

    useKey('Enter', onRegister as any)

    const onValuesChange = (values: any) => {
      if (values?.username) setuserName(values.username)
    }

    return (
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={onRegister}
          onValuesChange={onValuesChange}>
            <Form.Item
              name='username'
              rules={UserNameRule}>
                <Input prefix={<UserOutlined />} placeholder='用户名' autoComplete='on' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={PassWordRule}>
                <Input.Password  
                  prefix={<LockOutlined />}
                  placeholder='密码'
                  autoComplete='on' />
            </Form.Item>
            <Form.Item
              name='cpassword'
              rules={ConfirmRule}
              dependencies={['password']}>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='重复密码'
                  autoComplete='on' />
            </Form.Item>
            <Form.Item
              name='code'
              rules={CaptchaRule}>
                <Row gutter={12}>
                    <Col span='15'>
                        <Input
                          prefix={<CreditCardOutlined />}
                          type='text'
                          placeholder='验证码' />
                    </Col>
                    <Col span='9'>
                        <Captcha module='register' username={userName} />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' block loading={loading}>
                    注册
                </Button>
            </Form.Item>
        </Form>
) 
})

export default RegisterForm
