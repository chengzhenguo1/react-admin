import React, { memo, useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import { PaginationProps, Row, Divider } from 'antd'
import departmentApi from '@src/api/department'
import jobApi from '@src/api/job'
import staffApi from '@src/api/staff'
import userApi from '@src/api/user'
import AuthWrapper from '@src/components/AuthWrapper'
import Header from './Header'
import CardGroup from './CardGroup'
import './index.less'

const Dashboard: React.FC = memo(() => {
    const [page, setPage] = useState<PaginationProps>({
        pageSize: 10,
        current: 1,
    })

    const [departmentList, getDepartmentList] = useAsyncFn(departmentApi.getDepartmentList)
    const [userList, getUserList] = useAsyncFn(userApi.getUserList)
    const [jobList, getJobList] = useAsyncFn(jobApi.getJobList)
    const [staffList, getStaffList] = useAsyncFn(staffApi.getstaffList)

    useEffect(() => {
        const pageSize = page.pageSize || 10
        const pageNumber = page.current || 1
        getDepartmentList({ pageSize, pageNumber })
        getUserList({ pageSize, pageNumber })
        getJobList({ pageSize, pageNumber })
        getStaffList({ pageSize, pageNumber })
    }, [])

    return (
        <div className='dashboard'>
            <Header />
            <Divider />
            <AuthWrapper
              roles={['admin']}
              component={(
                  <div className='site-card-border-less-wrapper'>
                      <Row gutter={16}>
                          <CardGroup title='部门统计' loading={departmentList.loading} total={departmentList.value?.data?.total ?? 0} />
                          <CardGroup title='用户统计' loading={userList.loading} total={userList.value?.data?.total ?? 0} />
                          <CardGroup title='职位统计' loading={jobList.loading} total={jobList.value?.data?.total ?? 0} />
                          <CardGroup title='职员统计' loading={staffList.loading} total={staffList.value?.data?.total ?? 0} />
                      </Row>
                  </div>
                )} />
        </div>
)
 })

export default Dashboard
