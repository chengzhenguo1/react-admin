import React, { memo, useState } from 'react'
import { useAsyncFn } from 'react-use'

import {
 Form, Input, Button, Row, Col, 
} from 'antd'
import { UserOutlined, LockOutlined, CreditCardOutlined } from '@ant-design/icons'
import { CaptchaRule, PassWordRule, UserNameRule } from '@src/constants/validate'
import Captcha from '@src/components/Captcha'
import authApi from '@src/api/auth'

const LoginForm: React.FC = memo(() => {
    const [userName, setuserName] = useState('')
    const [, loginFn] = useAsyncFn(authApi.login)

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
        loginFn(values)
    }

    const onValuesChange = (values:any) => {
      if (values?.username) setuserName(values.username)
    }
    
    return (
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
                <Button type='primary' htmlType='submit' block>
                    登录
                </Button>
            </Form.Item>
        </Form>
) 
})

export default LoginForm
