import React, {
 memo, useCallback, useEffect, useState, 
} from 'react'
import { useHistory } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import jobApi from '@src/api/job'
import BasisTable from '@src/components/BasisTable'
import { IJob } from '@src/api/types/job'
import {
 Button, Table, Popconfirm, message, PaginationProps, Form, Switch, Modal,
} from 'antd'
import SearchItem from '@src/components/FormItem/SearchItem'

const JobList: React.FC = memo(() => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState<boolean>()
    const [page, setPage] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
    })
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [form] = Form.useForm()
    const { push } = useHistory()
    const [jobList, getJobListFn] = useAsyncFn(jobApi.getJobList)
    const [, deleteJobFn] = useAsyncFn(jobApi.jobDelete)
    const [, setJobStatusFn] = useAsyncFn(jobApi.setJobStatus)

    useEffect(() => {
        getJobData()
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
            setJobStatusFn(id, status)
            /* 立马修改后，服务器反应慢 */
            setTimeout(() => {
                getJobData()
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

    /* 删除职位 */
   const onDeleteModal = useCallback(
        (id:string) => {
            deleteJobFn(id).then((res) => {
                message.success(res.message)
                getJobData()
            })
        },
        [],
    )
    
    /* 点击搜索 */
   const onSearch = useCallback(
       () => {
           const name = form.getFieldValue('name')
           const status = form.getFieldValue('status')
           setStatus(status)
           setName(name)
       },
       [],
   )

    const getJobData = () => {
        getJobListFn({
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
            <BasisTable<IJob> 
              loading={jobList.loading} 
              data={jobList.value?.data.data}
              total={jobList.value?.data.total}
              rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
              onChange={onPageChange}
              footer={() => <Button onClick={onHandleDelete}>批量删除</Button>}>
                <Table.Column<IJob> 
                  title='职位名称' 
                  dataIndex='name' />
                <Table.Column<IJob> 
                  title='部门名称' 
                  dataIndex='jobName' />
                <Table.Column<IJob> 
                  title='禁启用' 
                  dataIndex='status' 
                  align='center' 
                  width={100}
                  render={(text, record) => (
                      <Switch 
                        checkedChildren='开启' 
                        unCheckedChildren='禁用'
                        checked={record.status}
                        onChange={(checked) => onHandleChangeStatus(record.jobId, checked)} />
                )} />
                <Table.Column<IJob> 
                  title='操作' 
                  align='center'
                  width={200}
                  render={(text, record) => (
                      <div className='table-btn-group'>
                          <Button
                            type='primary' 
                            onClick={() => push({ pathname: '/job/add', state: { jobId: record.jobId } })}>
                              编辑
                          </Button>
                          <Popconfirm
                            title='是否要删除该部门?'
                            onConfirm={() => onDeleteModal(record.jobId)}
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

export default JobList
