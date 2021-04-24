import React, {
memo, useCallback, useEffect, useState, 
} from 'react'
import { useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import userApi from '@src/api/user'
import BasisTable from '@src/components/BasisTable'
import SearchItem from '@src/components/FormItem/SearchItem'
import { IDepartmentData } from '@src/api/types/department'
import {
Button, Table, Popconfirm, message, PaginationProps, Form, Input, Switch, Modal, Row,
} from 'antd'
import './index.less'
import { IUser } from '@src/api/types/auth'
import { User } from '@src/api/types/user'
import AddModal from './AddModal'

const UserList: React.FC = memo(() => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [addVisible, setAddVisible] = useState(false)
    const [page, setPage] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [form] = Form.useForm()
    
    const [departmentList, getDepartmentListFn] = useAsyncFn(userApi.getUserList)
    const [, deleteDepartmentFn] = useAsyncFn(userApi.userDelete)
    const [, setDepartmentStatusFn] = useAsyncFn(userApi.setUserStatus)

    useEffect(() => {
        getDepartmentData()
    }, [page, name, id])

    const closeAddModal = useCallback(
        () => {
            setAddVisible(false)
            setId('')
        },
        [],
    )

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
    const onHandleSearch = useCallback(
        () => {
            const name = form.getFieldValue('name')
            setName(name)
        },
        [],
    )

    const getDepartmentData = () => {
        console.log(name)
        getDepartmentListFn({ name, pageNumber: page.current || 1, pageSize: page.pageSize || 10 })
    }

    return (
        <div>
            <Form 
              form={form}
              layout='inline' 
              className='mb-20 header-form'
              onFinish={onHandleSearch}>
                <div>
                    <SearchItem.SearchName form={form} label='用户名称' />
                    <SearchItem.SearchStatus form={form} />
                    <Button type='primary' htmlType='submit'>搜索</Button>
                </div>
                <div>
                    <Button 
                      type='primary'
                      onClick={() => { setAddVisible(true) }}>
                        添加用户
                    </Button>
                </div>
            </Form>
            <BasisTable<User> 
              loading={departmentList.loading} 
              data={departmentList.value?.data.data}
              total={departmentList.value?.data.total}
              rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
              onChange={onPageChange}
              footer={() => <Button onClick={onHandleDelete}>批量删除</Button>}>
                <Table.Column<User> 
                  title='用户名' 
                  dataIndex='username' />
                <Table.Column<User> 
                  title='真实姓名' 
                  dataIndex='truename' />
                <Table.Column<User> 
                  title='手机号' 
                  dataIndex='phone' />
                <Table.Column<User> 
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
                <Table.Column<User> 
                  title='操作' 
                  align='center'
                  width={200}
                  render={(text, record) => (
                      <div className='table-btn-group'>
                          <Button
                            type='primary' 
                            onClick={() => { setAddVisible(true); setId(record.id) }}>
                              编辑
                          </Button>
                          <Popconfirm
                            title='是否要删除该用户?'
                            onConfirm={() => onDeleteModal(record.id)}
                            okText='确认'
                            cancelText='取消'>
                              <Button>删除</Button>
                          </Popconfirm>
                      </div>
                    )} />
            </BasisTable>

            <AddModal 
              visible={addVisible}
              id={id}
              onClose={() => { closeAddModal() }}
              onConfirm={() => { closeAddModal() }} />
        </div>
)
})

export default UserList
