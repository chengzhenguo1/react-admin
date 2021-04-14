import React, { memo, useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import departmentApi from '@src/api/department'
import BasisTable from '@src/components/BasisTable'
import { DepartmentData, IDepartment } from '@src/api/types/department'
import { Table } from 'antd'

const DepartList: React.FC = memo(() => {
    const [departmentList, getDepartmentListFn] = useAsyncFn(departmentApi.getDepartmentList)
    const [departmentListAll, getDepartmentListAllFn] = useAsyncFn(departmentApi.getDepartmentListAll)

    useEffect(() => {
        getDepartmentListAllFn()
    }, [])

    return (
        <div>
            <BasisTable<DepartmentData> loading={departmentListAll.loading} data={departmentListAll?.value}>
                <Table.Column<DepartmentData> title='id' align='center' dataIndex='id' />
            </BasisTable>
        </div>
)
 })

export default DepartList
