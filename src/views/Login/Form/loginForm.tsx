import React, { memo, useCallback } from 'react'
import { useAsyncFn, useKey } from 'react-use'
import { useHistory } from 'react-router-dom'
import sha256 from 'crypto-js/sha256'
import authApi from '@src/api/auth'
import { setToken, setUser } from '@src/utils/auth'
import { Form, Button, message } from 'antd'
import LoginItem from '@src/components/LoginItem'
import type { IParam } from '@src/api/types/auth'

type FormProp = IParam

const LoginForm: React.FC = memo(() => {
    const { push } = useHistory()
    const [{ loading }, loginFn] = useAsyncFn(authApi.login)
    const [form] = Form.useForm()

    const onLogin = useCallback(
      () => {
        form.validateFields().then((res) => {
          const values = res as FormProp
          loginFn({ username: values.username, password: sha256(values.password).toString(), code: values.code }).then(({ data, message: mes }) => {
            message.success(mes)
            setToken(data.token)
            setUser(data.username)
            push('/dashboard')
          })
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
            <LoginItem.UserName form={form} />
            <LoginItem.PassWord form={form} />
            <LoginItem.Code form={form} module='login' />
            <Form.Item>
                <Button type='primary' htmlType='submit' block loading={loading}>
                    登录
                </Button>
            </Form.Item>
        </Form>
) 
})

export default LoginForm
