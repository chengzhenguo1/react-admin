import React, { memo, useCallback } from 'react'
import { useAsyncFn, useKey } from 'react-use'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import sha256 from 'crypto-js/sha256'
import authApi from '@src/api/auth'
import { Form, Button, message } from 'antd'
import LoginItem from '@src/components/FormItem/LoginItem'
import type { IParam } from '@src/api/types/auth'
import { UserState, setUserInfo } from '@src/store/module/user'

type FormProp = IParam

interface IProps {
  setUserInfo: (user: UserState)=> void
}

const LoginForm: React.FC<IProps> = memo((props) => {
    const { replace } = useHistory()
    const [{ loading }, loginFn] = useAsyncFn(authApi.login)
    const [form] = Form.useForm()

    const next = () => {
      const params = new URLSearchParams(window.location.search)
      const redirectURL = params.get('redirectURL')
      if (redirectURL) {
        window.location.href = redirectURL
        return
      }
      replace('/')
    }

    const onLogin = useCallback(
      () => {
        form.validateFields().then(async (res) => {
          const values = res as FormProp
          const { data, message: mes } = await loginFn({ 
            username: values.username, 
            password: sha256(values.password).toString(), 
            code: values.code, 
          })
          if (data) {
            message.success(mes)
            props.setUserInfo(data)
            next()
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

export default connect(() => ({}), {
  setUserInfo,
})(LoginForm)
