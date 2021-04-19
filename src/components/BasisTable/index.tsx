import React, { useState } from 'react'
import { PaginationProps, Table, TableProps } from 'antd'
 
interface IProps<T> extends TableProps<T>{
    // eslint-disable-next-line react/require-default-props
    data?: T[]
    // eslint-disable-next-line react/require-default-props
    total?: number
    children: React.ReactNode
    onChange: (pageParams: PaginationProps)=>void
}

function BasisTable<T extends({id?: string, jobId?: string})>(props: IProps<T>) {
        const {
    data, total, loading, onChange, children, ...resetProps 
    } = props 
    const [pagination, setPagination] = useState<PaginationProps>({
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
    })

    const onTableChange = (pageParams: PaginationProps) => {
        setPagination(pageParams)
        onChange(pageParams)
    }

    return (
        <Table<T> 
          {...resetProps}
          loading={loading}
          dataSource={data && data}
          bordered
          rowKey={(record) => (record?.id ? record?.id as string : record?.jobId as string)}
          pagination={{
            ...pagination,
            total: total && total,
            showTotal: (total) => `总共${total}条`,
          }}
          onChange={onTableChange}>
            {children}
        </Table>
    )  
}

export default BasisTable
