import React, { memo, useCallback, useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Form, message } from 'antd'
import { IDepartmentParams } from '@src/api/types/department'
import { LayoutCol } from '@src/constants/app'
import departmentApi from '@src/api/department'
import DepartmentItem from '@src/components/FormItem/DepartmentItem'

const DepartmentAdd: React.FC = memo(() => {
    const { state } = useLocation<{id: string}>()
    const [form] = Form.useForm()
    const { goBack } = useHistory()

    const [, addOrEditDepartmentFn] = useAsyncFn(departmentApi.addOrEditDepartment)
    const [, getDepartmentDetailedFn] = useAsyncFn(departmentApi.getDepartmentDetailed)

    /* 部门列表跳转判断是否有id */
    useEffect(() => {
        if (state?.id) {
            getDepartmentDetailedFn(state.id).then((res) => {
                form.setFieldsValue(res)
            })
        }
    }, [])

    /* 编辑或者删除 */
    const onHandleSubmit = useCallback(
        () => {
          form.validateFields().then((res: IDepartmentParams) => {
              const id = state?.id ? state.id : undefined
              const values = { id, ...res }
              addOrEditDepartmentFn(values).then((mes) => {
                  message.success(mes)
                  form.resetFields()
                  goBack()
              })
          })
        },
        [],
    )

    return (
        <Form
          {...LayoutCol}
          form={form}
          onFinish={onHandleSubmit}
          labelAlign='right'
          initialValues={{
            status: false,
            number: 1,
          }}>
            <DepartmentItem.Name form={form} />
            <DepartmentItem.Number form={form} />
            <DepartmentItem.Status form={form} />
            <DepartmentItem.Content form={form} />
            <Form.Item wrapperCol={{ ...LayoutCol.wrapperCol, offset: 4 }}>
                <Button type='primary' htmlType='submit'>
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
})

export default DepartmentAdd
