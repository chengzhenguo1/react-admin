import React, {
    memo, useCallback, useEffect, useState, 
} from 'react'
import { useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import staffApi from '@src/api/staff'
import BasisTable from '@src/components/BasisTable'
import {
    Button, Table, Popconfirm, message, PaginationProps, Form, Switch, Modal,
} from 'antd'
import { IStaff } from '@src/api/types/staff'
import SearchItem from '@src/components/FormItem/searchItem'

const StaffList: React.FC = memo(() => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState<boolean>()
    const [page, setPage] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [form] = Form.useForm()
    const { push } = useHistory()
    const [staffList, getStaffFn] = useAsyncFn(staffApi.getstaffList)
    const [, deleteStaffFn] = useAsyncFn(staffApi.deleteStaff)
    const [, setStatusFn] = useAsyncFn(staffApi.setstaffStatus)

    useEffect(() => {
        getStaffData()
    }, [page, name, status])

    /* 页码改变 */
    const onPageChange = useCallback(
        (page: PaginationProps) => {
            setPage(page)
        },
        [],
    )

    /* 多选 */
    const onSelectChange = useCallback(
        (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys)
        },
        [],
    )

    /* 切换状态 */
    const onHandleChangeStatus = useCallback(
        (id, status) => {
            setStatusFn(id, status)
            /* 立马修改后，服务器反应慢 */
            setTimeout(() => {
                getStaffData()
            }, 10)
        },
        [],
    )

    /* 批量删除 */
    const onHandleDelete = useCallback(
        () => {
            if (selectedRowKeys.length < 1) {
                return false
            }
            Modal.confirm({
                title: '是否删除所选职员?',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    onDeleteModal(selectedRowKeys.join())
                    setSelectedRowKeys([])
                },
            })
        },
        [selectedRowKeys],
    )

    /* 删除职位 */
    const onDeleteModal = useCallback(
        (id:string) => {
            deleteStaffFn(id).then((res) => {
                message.success(res.message)
                getStaffData()
            })
        },
        [],
    )
    
    /* 点击搜索 */
    const onSearch = useCallback(
        () => {
            const name = form.getFieldValue('jobName')
            const status = form.getFieldValue('status')
            setStatus(status)
            setName(name)
        },
        [],
    )

    const getStaffData = () => {
        getStaffFn({
            name, status, pageNumber: page.current || 1, pageSize: page.pageSize || 10, 
        })
    }

    return (
        <div>
            <Form 
              form={form} 
              layout='inline' 
              className='mb-20'
              onFinish={onSearch}>
                <SearchItem.SearchName form={form} />
                <SearchItem.SearchStatus form={form} />
                <Form.Item>
                    <Button type='primary' htmlType='submit'>搜索</Button>
                </Form.Item>
            </Form>
            <BasisTable<IStaff> 
              loading={staffList.loading} 
              data={staffList.value?.data.data}
              total={staffList.value?.data.total}
              rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
              onChange={onPageChange}
              footer={() => <Button onClick={onHandleDelete}>批量删除</Button>}>
                <Table.Column<IStaff> 
                  title='职员名称' 
                  dataIndex='full_name' />
                <Table.Column<IStaff> 
                  title='部门名称' 
                  dataIndex='jobName' />
                <Table.Column<IStaff> 
                  title='禁启用' 
                  dataIndex='status' 
                  align='center' 
                  width={100}
                  render={(text, record) => (
                      <Switch 
                        checkedChildren='开启' 
                        unCheckedChildren='禁用'
                        checked={record.status}
                        onChange={(checked) => onHandleChangeStatus(record.staff_id, checked)} />
                )} />
                <Table.Column<IStaff> 
                  title='操作' 
                  align='center'
                  width={200}
                  render={(text, record) => (
                      <div className='table-btn-group'>
                          <Button
                            type='primary' 
                            onClick={() => push({ pathname: '/staff/add', state: { id: record.staff_id } })}>
                              编辑
                          </Button>
                          <Popconfirm
                            title='是否要删除该部门?'
                            onConfirm={() => onDeleteModal(record.staff_id)}
                            okText='确认'
                            cancelText='取消'>
                              <Button>删除</Button>
                          </Popconfirm>
                      </div>
                    )} />
            </BasisTable>
        </div>
)
    })

export default StaffList
