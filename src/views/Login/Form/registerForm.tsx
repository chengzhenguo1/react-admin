import React, { memo, useCallback } from 'react'
import sha256 from 'crypto-js/sha256'
import { useAsyncFn, useKey } from 'react-use'
import { Form, Button, message } from 'antd'
import { IParam } from '@src/api/types/auth'
import authApi from '@src/api/auth'
import LoginItem from '@src/components/FormItem/LoginItem'

interface IProps {
  toggleState: ()=> void
}

interface FormProp extends IParam{
  cpassword: string
}

const RegisterForm: React.FC<IProps> = memo(({ toggleState }) => {
  const [form] = Form.useForm()

  const [{ loading }, registerFn] = useAsyncFn(authApi.register)
    
    const onRegister = useCallback(
      () => {
        form.validateFields().then(async (res) => { 
          const values = res as FormProp
          const { cpassword, ...user } = { ...values }
          const data = await registerFn({ 
            username: user.username, 
            password: sha256(user.password).toString(), 
            code: user.code, 
          })
          
          if (data.message) {
            message.success(data.message)
            toggleState()
          }
        })
      },
      [],
      )
      
    useKey('Enter', onRegister)

    return (
        <Form
          form={form}
          onFinish={onRegister}>
            <LoginItem.UserName form={form} />
            <LoginItem.PassWord form={form} />
            <LoginItem.Confirm form={form} />
            <LoginItem.Code form={form} module='register' />
            <Form.Item>
                <Button type='primary' htmlType='submit' block loading={loading}>
                    注册
                </Button>
            </Form.Item>
        </Form>
) 
})

export default RegisterForm
