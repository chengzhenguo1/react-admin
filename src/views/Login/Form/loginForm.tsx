import React, { memo, useState } from 'react'
import { useAsyncFn } from 'react-use'
import { useHistory } from 'react-router-dom'
import sha256 from 'crypto-js/sha256'

import { CaptchaRule, PassWordRule, UserNameRule } from '@src/constants/validate'
import authApi from '@src/api/auth'
import { setToken } from '@src/utils/auth'

import {
 Form, Input, Button, Row, Col, message, 
} from 'antd'
import { UserOutlined, LockOutlined, CreditCardOutlined } from '@ant-design/icons'
import Captcha from '@src/components/Captcha'

const LoginForm: React.FC = memo(() => {
    const [userName, setuserName] = useState('')
    const { push } = useHistory()
    const [{ loading }, loginFn] = useAsyncFn(authApi.login)

    const onLogin = async (values: any) => {
      const { data, message: mes } = await loginFn({ username: values.username, password: sha256(values.password).toString(), code: values.code })
      if (data) {
        message.success(mes)
        setToken(data.token)
        push('/home')
      } 
    }

    const onValuesChange = (values:any) => {
      if (values?.username) setuserName(values.username)
    }
    
    return (
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={onLogin}
          onValuesChange={onValuesChange}
          autoComplete='on'>
            <Form.Item
              name='username'
              rules={UserNameRule}
              initialValue={userName}>
                <Input prefix={<UserOutlined />} placeholder='用户名' />
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
                        <Captcha module='login' username={userName} />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' block loading={loading}>
                    登录
                </Button>
            </Form.Item>
        </Form>
) 
})

export default LoginForm
