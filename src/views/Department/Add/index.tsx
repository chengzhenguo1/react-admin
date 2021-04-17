import React, { memo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import departmentApi from '@src/api/department'
import DepartmentItem from '@src/components/FormItem/DepartmentItem'
import { Button, Form, message } from 'antd'

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
                  form.resetFields()
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
            number: 1,
          }}>
            <DepartmentItem.Name form={form} />
            <DepartmentItem.Number form={form} />
            <DepartmentItem.Status form={form} />
            <DepartmentItem.Content form={form} />
            <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>确定</Button>
            </Form.Item>
        </Form>
    )
})

export default DepartmentAdd
