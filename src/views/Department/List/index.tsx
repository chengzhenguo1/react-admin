import React, {
 memo, useCallback, useEffect, useState, 
} from 'react'
import { useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import departmentApi from '@src/api/department'
import BasisTable from '@src/components/BasisTable'
import { IDepartmentData } from '@src/api/types/department'
import {
 Button, Table, Popconfirm, message, PaginationProps, Form, Input, Switch, Modal,
} from 'antd'

const DepartList: React.FC = memo(() => {
    const [name, setName] = useState('')
    const [page, setPage] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [form] = Form.useForm()
    const { push } = useHistory()

    const [departmentList, getDepartmentListFn] = useAsyncFn(departmentApi.getDepartmentList)
    const [, deleteDepartmentFn] = useAsyncFn(departmentApi.deleteDepartment)
    const [, setDepartmentStatusFn] = useAsyncFn(departmentApi.setDepartmentStatus)

    useEffect(() => {
        getDepartmentData()
    }, [page, name])

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
                message.success(res.message)
                getDepartmentData()
            })
        },
        [],
    )
    
    /* 点击搜索 */
   const onSearchDepartment = useCallback(
       () => {
           const name = form.getFieldValue('name')
           setName(name)
       },
       [],
   )

    const getDepartmentData = () => {
        getDepartmentListFn({ name, pageNumber: page.current || 1, pageSize: page.pageSize || 10 })
    }

    return (
        <div>
            <Form 
              form={form} 
              layout='inline' 
              style={{ marginBottom: '20px' }}
              onFinish={onSearchDepartment}>
                <Form.Item label='部门名称' name='name'>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>搜索</Button>
                </Form.Item>
            </Form>
            <BasisTable<IDepartmentData> 
              loading={departmentList.loading} 
              data={departmentList.value?.data.data}
              total={departmentList.value?.data.total}
              rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
              onChange={onPageChange}
              footer={() => <Button onClick={onHandleDelete}>批量删除</Button>}>
                <Table.Column<IDepartmentData> 
                  title='部门名称' 
                  dataIndex='name' />
                <Table.Column<IDepartmentData> 
                  title='禁启用' 
                  dataIndex='status' 
                  align='center' 
                  width={100}
                  render={(text, record) => (
                      <Switch 
                        checkedChildren='开启' 
                        unCheckedChildren='禁用'
                        checked={record.status}
                        onChange={(checked) => onHandleChangeStatus(record.id, checked)} />
                )} />
                <Table.Column<IDepartmentData> 
                  title='人员数量' 
                  dataIndex='number' />
                <Table.Column<IDepartmentData> 
                  title='操作' 
                  align='center'
                  width={200}
                  render={(text, record) => (
                      <div className='table-btn-group'>
                          <Button
                            type='primary' 
                            onClick={() => push({ pathname: '/department/add', state: { id: record.id } })}>
                              编辑
                          </Button>
                          <Popconfirm
                            title='是否要删除该部门?'
                            onConfirm={() => onDeleteModal(record.id)}
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

export default DepartList
