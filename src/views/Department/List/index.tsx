import React, {
 memo, useCallback, useEffect, useState, 
} from 'react'
import { useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import {
    Button, Table, Popconfirm, message, PaginationProps, Form, Switch, Modal,
} from 'antd'
import { IDepartment } from '@src/api/types/department'
import BasisTable from '@src/components/BasisTable'
import departmentApi from '@src/api/department'
import SearchItem, { SearchParam } from '@src/components/FormItem/SearchItem'

const DepartList: React.FC = memo(() => {
    const [search, setSearch] = useState<SearchParam>()
    const [page, setPage] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    
    const [form] = Form.useForm()
    const { push } = useHistory()

    const [departmentList, getDepartmentListFn] = useAsyncFn(departmentApi.getDepartmentList)
    const [deleteDepartment, deleteDepartmentFn] = useAsyncFn(departmentApi.deleteDepartment)
    const [, setDepartmentStatusFn] = useAsyncFn(departmentApi.setDepartmentStatus)

    useEffect(() => {
        getDepartmentData()
    }, [page, search])

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
            setDepartmentStatusFn(id, status)
            /* 立马修改后，服务器反应慢 */
            setTimeout(() => {
                getDepartmentData()
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
                title: '是否删除所选部门?',
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

    /* 删除部门 */
   const onDeleteModal = useCallback(
        (id:string) => {
            deleteDepartmentFn(id).then((res) => {
                message.success(res)
                getDepartmentData()
            })
        },
        [],
    )
    
    /* 点击搜索 */
   const onHandleSearch = useCallback(
       (res: SearchParam) => {
          setSearch(res)
       },
       [],
   )

    const getDepartmentData = () => {
        getDepartmentListFn({
            name: search?.name, status: search?.status, pageNumber: page.current || 1, pageSize: page.pageSize || 10, 
        })
    }

    return (
        <div>
            <Form 
              form={form} 
              layout='inline' 
              className='mb-20'
              onFinish={onHandleSearch}>
                <SearchItem.SearchName form={form} label='部门名称' />
                <SearchItem.SearchStatus form={form} />
                <Form.Item>
                    <Button type='primary' htmlType='submit'>搜索</Button>
                </Form.Item>
            </Form>
            <BasisTable<IDepartment> 
              loading={departmentList.loading} 
              data={departmentList.value?.data.data}
              total={departmentList.value?.data.total}
              rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
              onChange={onPageChange}
              footer={() => <Button onClick={onHandleDelete}>批量删除</Button>}>
                <Table.Column<IDepartment> 
                  title='部门名称' 
                  dataIndex='name' />
                <Table.Column<IDepartment> 
                  title='禁启用' 
                  dataIndex='status' 
                  align='center' 
                  width={100}
                  render={(_, record) => (
                      <Switch 
                        checkedChildren='开启' 
                        unCheckedChildren='禁用'
                        checked={record.status}
                        onChange={(checked) => onHandleChangeStatus(record.id, checked)} />
                )} />
                <Table.Column<IDepartment> 
                  title='人员数量' 
                  dataIndex='number' />
                <Table.Column<IDepartment> 
                  title='操作' 
                  align='center'
                  width={200}
                  render={(_, record) => (
                      <div className='table-btn-group'>
                          <Button
                            type='primary' 
                            onClick={() => push({ pathname: '/department/add', state: { id: record.id } })}>
                              编辑
                          </Button>
                          <Popconfirm
                            title='是否要删除该部门?'
                            onConfirm={() => onDeleteModal(record.id!)}
                            okText='确认'
                            cancelText='取消'>
                              <Button loading={deleteDepartment.loading}>删除</Button>
                          </Popconfirm>
                      </div>
                    )} />
            </BasisTable>
        </div>
)
 })

export default DepartList
