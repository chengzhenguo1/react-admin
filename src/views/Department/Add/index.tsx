import React, { memo, useCallback } from 'react'
import { useAsyncFn } from 'react-use'
import { AddDepartmentProps } from '@src/api/types/department'
import departmentApi from '@src/api/department'
import {
    Button,
    Form,
    Input, 
    InputNumber,
    message,
    Radio, 
} from 'antd'

const DepartmentAdd: React.FC = memo(() => {
    const [form] = Form.useForm()
    const [{ loading }, addDepartmentFn] = useAsyncFn(departmentApi.addDepartment)
    
    const onHandleAddDartmentAdd = useCallback(
        () => {
          form.validateFields().then((res) => {
              const values = res as AddDepartmentProps
              addDepartmentFn(values).then((data) => {
                  message.success(data.message)
              })
          })
        },
        [],
    )

    return (
        <Form
          form={form}
          onFinish={onHandleAddDartmentAdd}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          labelAlign='left'
          initialValues={{
            status: false,
          }}>
            <Form.Item 
              label='部门名称'
              name='name' 
              rules={[{ required: true, message: '请输入部门名称！' }]}>
                <Input />
            </Form.Item>
            <Form.Item 
              label='人员数量' 
              name='number' 
              rules={[{ required: true, message: '请选择人员数量！' }]}>
                <InputNumber min={1} max={100} />
            </Form.Item>
            <Form.Item label='禁启用' name='status'>
                <Radio.Group>
                    <Radio value={false}>禁用</Radio>
                    <Radio value>启动</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label='描述' name='content'>
                <Input.TextArea rows={10} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>确定</Button>
            </Form.Item>
        </Form>
    )
})

export default DepartmentAdd
