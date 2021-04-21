import React, { memo, useCallback, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import jobApi from '@src/api/job'
import departmentApi from '@src/api/department'
import JobItem from '@src/components/FormItem/JobItem'
import { Button, Form, message } from 'antd'

const JobAdd: React.FC = memo(() => {
    const [{ loading }, jobAddOrEditFn] = useAsyncFn(jobApi.jobAddOrEdit)
    const [, getJobDetailedFn] = useAsyncFn(jobApi.jobDetail)
    const [departmentList, getDepartmentListFn] = useAsyncFn(departmentApi.getDepartmentList)
    const { state } = useLocation<{jobId: string}>()
    const [form] = Form.useForm()

    /* 职位列表跳转判断是否有id */
    useEffect(() => {
        getDepartmentListFn()
        if (state?.jobId) {
            getJobDetailedFn(state.jobId).then((res) => {
                form.setFieldsValue(res)
            })
        }
    }, [])

    /* 编辑或者删除 */
    const onHandleDartmentAddOrEdit = useCallback(
        () => {
          // 需要修复修改后id还存在的问题
          form.validateFields().then((res) => {
              let jobId = state?.jobId
              const values = { ...res, jobId }
              jobAddOrEditFn(values).then((data) => {
                console.log(jobId)
                jobId = ''
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
            <JobItem.Name
              form={form} 
              optionItem={departmentList?.value?.data.data.map((item) => ({ value: item.id, text: item.name }))} 
              loading={departmentList?.loading} />
            <JobItem.JobName form={form} />
            <JobItem.Status form={form} />
            <JobItem.Content form={form} />
            <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>确定</Button>
            </Form.Item>
        </Form>
    )
})

export default JobAdd
