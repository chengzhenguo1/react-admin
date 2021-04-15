import React, { memo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
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
    const [{ loading }, addOrEditDepartmentFn] = useAsyncFn(departmentApi.addOrEditDepartment)
    const [, getDepartmentDetailedFn] = useAsyncFn(departmentApi.getDepartmentDetailed)
    const { state } = useLocation<{id: string}>()
    const [form] = Form.useForm()

    /* 部门列表跳转判断是否有id */
    useEffect(() => {
        if (state?.id) {
            getDepartmentDetailedFn(state.id).then((res) => {
                form.setFieldsValue(res)
            })
        }
    }, [])

    /* 编辑或者删除 */
    const onHandleDartmentAddOrEdit = useCallback(
        () => {
          form.validateFields().then((res) => {
              const id = state?.id ? state.id : undefined
              const values = { id, ...res }
              addOrEditDepartmentFn(values).then((data) => {
                  message.success(data.message)
              })
          })
        },
        [],
    )

    return (
        <Form
          form={form}
          onFinish={onHandleDartmentAddOrEdit}
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
