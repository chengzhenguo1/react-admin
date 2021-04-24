import React, { memo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { Button, Form, message } from 'antd'
import jobApi from '@src/api/job'
import departmentApi from '@src/api/department'
import JobItem from '@src/components/FormItem/JobItem'

const JobAdd: React.FC = memo(() => {
    const { state } = useLocation<{jobId: string}>()
    
    const [form] = Form.useForm()

    const [{ loading }, jobAddOrEditFn] = useAsyncFn(jobApi.jobAddOrEdit)
    const [, getJobDetailedFn] = useAsyncFn(jobApi.jobDetail)
    const [departmentAll, getDepartmentAllFn] = useAsyncFn(departmentApi.getDepartmentListAll)

    /* 职位列表跳转判断是否有id */
    useEffect(() => {
        getDepartmentAllFn()
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
              optionItem={departmentAll?.value?.map((item) => ({ value: item.id, text: item.name }))} 
              loading={departmentAll?.loading} />
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
