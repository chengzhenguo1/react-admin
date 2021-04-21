import React, { memo, useCallback, useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { useLocation } from 'react-router-dom'
import { Button, Form, message } from 'antd'
import departmentApi from '@src/api/department'
import jobApi from '@src/api/job'
import staffApi from '@src/api/staff'
import StaffItem from '@src/components/FormItem/StaffItem'
import './index.less'
import moment from 'moment'

const StaffAdd: React.FC = memo(() => {
    const [form] = Form.useForm()
    const { state } = useLocation<{id: string}>()
    const [departmentAll, getDepartmentListAllFn] = useAsyncFn(departmentApi.getDepartmentListAll)
    const [jobAll, getJobListAllFn] = useAsyncFn(jobApi.getJobAllList)
    const [staffDetail, getStaffDetailFn] = useAsyncFn(staffApi.getstaffDetail)
    const [, addStaffFn] = useAsyncFn(staffApi.staffAdd)
    const [, editStaffFn] = useAsyncFn(staffApi.editstaff)

    useEffect(() => {
      getDepartmentListAllFn()
      getJobListAllFn()
      if (state?.id) {
        getStaffDetailFn(state.id).then((res) => {
          const {
            birthday, 
            job_entry_date,
            job_formal_date,
            job_status_date,
            job_quit_date,
             ...data 
          } = res

          const basisDate = {
            birthday: birthday ? moment(birthday) : null,
            job_entry_date: job_entry_date ? moment(job_entry_date) : null,
            job_formal_date: job_formal_date ? moment(job_formal_date) : null,
            job_status_date: job_status_date ? moment(job_status_date) : null,
            job_quit_date: job_quit_date ? moment(job_quit_date) : null,
          }

          form.setFieldsValue({ ...data, ...basisDate })
        })
      }
  }, [])

      const onFinish = useCallback(
        () => {
          form.validateFields().then((res) => {
              const id = state?.id
              const values = { id, ...res }

              if (id) {
                editStaffFn(values).then((data) => {
                    message.success(data.message)
                })
              } else {
                addStaffFn(values).then((data) => {
                    message.success(data.message)
                })
              }
              /* form.resetFields() */
          })
        },
        [],
    )

    return (
        <Form 
          className='cc'
          form={form}
          layout='vertical'
          onFinish={onFinish}
          requiredMark={false}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 10 }}
          labelAlign='right'>
            <StaffItem.Name form={form} />
            <StaffItem.Sex form={form} />
            <StaffItem.CardId form={form} />
            <StaffItem.Birthday form={form} />
            <StaffItem.DiplomaImg form={form} />
            <StaffItem.FaceImg form={form} />
            <StaffItem.Phone form={form} />
            <StaffItem.Nation form={form} />
            <StaffItem.Political form={form} />
            <StaffItem.School form={form} />
            <StaffItem.Education form={form} />
            <StaffItem.Major form={form} />
            <StaffItem.Wechat form={form} />
            <StaffItem.Email form={form} />
            <StaffItem.JobId
              loading={jobAll.loading} 
              optionItem={jobAll.value?.map((item) => ({ text: item.jobName, value: item.jobId }))} 
              form={form} />
            <StaffItem.DepartmenId 
              loading={departmentAll.loading} 
              optionItem={departmentAll.value?.map((item) => ({ text: item.name, value: item.id }))} 
              form={form} />
            {/* <StaffItem.JobStatusDate form={form} /> */}
            <StaffItem.JobEntryDate form={form} />
            <StaffItem.JobFormalDate form={form} />
            <StaffItem.JobQuitDate form={form} />
            <StaffItem.JobStatus form={form} />
            <StaffItem.CompanyEmail form={form} />
            <StaffItem.Introduce form={form} />
            <StaffItem.Status form={form} />
            <div style={{ flexBasis: '100%' }}>
                <Form.Item>
                    <Button htmlType='submit'>提交</Button>
                </Form.Item>
            </div>
        </Form>
)
 })

export default StaffAdd
