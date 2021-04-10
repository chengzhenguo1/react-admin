import React, { memo, useState } from 'react'

import {
 Form, Input, Button, Row, Col, message, 
} from 'antd'
import { UserOutlined, LockOutlined, CreditCardOutlined } from '@ant-design/icons'
import {
 CaptchaRule, ConfirmRule, PassWordRule, UserNameRule, 
} from '@src/constants/validate'
import { useAsyncFn } from 'react-use'
import authApi from '@src/api/auth'
import Captcha from '@src/components/Captcha'

interface IProps {
  toggleState: ()=> void
}

const RegisterForm: React.FC<IProps> = memo(({ toggleState }) => {
  const [userName, setuserName] = useState('')

  const [, registerFn] = useAsyncFn(authApi.register)

    const onFinish = (values: any) => {
        const { cpassword = 0, ...data } = { ...values }
        registerFn(data).then((mes) => {
          if (mes) {
            message.success(mes)
             toggleState()
          }
        })
    }

    const onValuesChange = (values: any) => {
      if (values?.username) setuserName(values.username)
    }

    return (
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onValuesChange={onValuesChange}>
            <Form.Item
              name='username'
              rules={UserNameRule}>
                <Input prefix={<UserOutlined />} placeholder='用户名' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={PassWordRule}>
                <Input
                  prefix={<LockOutlined />}
                  type='password'
                  placeholder='密码' />
            </Form.Item>
            <Form.Item
              name='cpassword'
              rules={ConfirmRule}
              dependencies={['password']}>
                <Input
                  prefix={<LockOutlined />}
                  type='password'
                  placeholder='重复密码' />
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
                <Button type='primary' htmlType='submit' block>
                    注册
                </Button>
            </Form.Item>
        </Form>
) 
})

export default RegisterForm
