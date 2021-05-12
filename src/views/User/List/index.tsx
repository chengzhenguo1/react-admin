import React, {
memo, useCallback, useEffect, useState, 
} from 'react'
import { useAsyncFn } from 'react-use'
import {
    Button, Table, Popconfirm, message, PaginationProps, Form, Switch, Modal,
} from 'antd'
import userApi from '@src/api/user'
import { User } from '@src/api/types/user'
import BasisTable from '@src/components/BasisTable'
import AuthWrapper from '@src/components/AuthWrapper'
import SearchItem, { SearchParam } from '@src/components/FormItem/SearchItem'
import AddModal from './AddModal'
import './index.less'

const UserList: React.FC = memo(() => {
    const [search, setSearch] = useState<SearchParam>()
    const [id, setId] = useState('')
    const [addVisible, setAddVisible] = useState(false)
    const [page, setPage] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [form] = Form.useForm()
    
    const [userList, getUserListFn] = useAsyncFn(userApi.getUserList)
    const [, deleteDepartmentFn] = useAsyncFn(userApi.deleteUser)
    const [, setDepartmentStatusFn] = useAsyncFn(userApi.setUserStatus)

    useEffect(() => {
        getUserData()
    }, [page, search])

    /* 关闭对话框 */
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
                getUserData()
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

    /* 删除 */
    const onDeleteModal = useCallback(
        async (id:string) => {
           const data = await deleteDepartmentFn(id)
           message.success(data.message)
           getUserData()
        },
        [],
    )
    
    /* 点击搜索 */
    const onHandleSearch = useCallback(
        (value: SearchParam) => {
            setSearch(value)
        },
        [],
    )

    const getUserData = () => {
        getUserListFn({
            name: search?.name, 
            status: search?.status, 
            pageNumber: page.current || 1, 
            pageSize: page.pageSize || 10, 
        })
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
                    <Button type='primary' htmlType='submit' loading={userList.loading}>搜索</Button>
                </div>
                <div>
                    <AuthWrapper
                      roles={['admin']}
                      component={(
                          <Button 
                            type='primary'
                            onClick={() => { setAddVisible(true) }}>
                              添加用户
                          </Button>
                    )} />
                </div>
            </Form>
            <BasisTable<User> 
              loading={userList.loading} 
              data={userList.value?.data.data}
              total={userList.value?.data.total}
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
            {/* 添加框 */}
            <AddModal 
              visible={addVisible}
              id={id}
              onClose={() => { closeAddModal() }}
              onConfirm={() => { closeAddModal(); getUserData() }} />
        </div>
)
})

export default UserList
