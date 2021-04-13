import React, { memo, useCallback } from 'react'
import { useAsyncFn, useKey } from 'react-use'
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
import { IParam } from '@src/api/types/auth'

type FormProp = IParam

const LoginForm: React.FC = memo(() => {
    const { push } = useHistory()
    const [{ loading }, loginFn] = useAsyncFn(authApi.login)
    const [form] = Form.useForm()

    const onLogin = useCallback(
      () => {
        form.validateFields().then(async (res) => {
          const values = res as FormProp
          const { data, message: mes } = await loginFn({ username: values.username, password: sha256(values.password).toString(), code: values.code })
          if (data) {
            message.success(mes)
            setToken(data.token)
            push('/dashboard')
          } 
        })
      },
      [],
    )
    
    /* 回车登录 */
    useKey('Enter', onLogin)
    
    return (
        <Form
          form={form}
          onFinish={onLogin}>
            <Form.Item
              name='username'
              rules={UserNameRule}>
                <Input prefix={<UserOutlined />} placeholder='用户名' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={PassWordRule}>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='密码' />
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
                        <Captcha module='login' form={form} />
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
