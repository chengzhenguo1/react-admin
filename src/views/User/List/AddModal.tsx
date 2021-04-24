import React, { memo, useCallback, useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { FormParam } from '@src/api/types/user'
import sha256 from 'crypto-js/sha256'
import userApi from '@src/api/user'
import authApi from '@src/api/auth'
import { Form, message, Modal } from 'antd'
import UserItem from '@src/components/FormItem/UserItem'

interface IProps {
    visible: boolean
    id?: string
    onClose: () => void
    onConfirm: () => void
}

const AddModal: React.FC<IProps> = memo(({
 visible, id, onClose, onConfirm, 
}) => {
    const [form] = Form.useForm()
    const [userAddOrEdit, userAddOrEditFn] = useAsyncFn(userApi.userAddOrEdit)
    const [getRole, getRoleFn] = useAsyncFn(authApi.getRole)
    const [getUserDetail, getUserDetailFn] = useAsyncFn(userApi.getUserDetail)

    useEffect(() => {
        if (id) {
            getUserDetailFn(id).then((res) => {
                form.setFieldsValue(res)
            })
        }
    }, [id])

    useEffect(() => {
        getRoleFn()
    }, [])

    const onSubmit = useCallback(
        () => {
            form.validateFields().then((res) => {
                const { cpassword, ...values } = res as FormParam & {cpassword: string}
                const data = { id, ...values, password: sha256(values.password).toString() }
                userAddOrEditFn(data).then((res) => {
                    message.success(res.message)
                    onConfirm()
                })
            }).catch((err) => {
                message.error(err.errorFields[0].errors[0])
            })
        },
        [id],
    )

    return (
        <Modal 
          visible={visible} 
          title={id ? '修改用户' : '添加用户'}
          onOk={onSubmit}
          onCancel={onClose}
          confirmLoading={userAddOrEdit.loading}
          destroyOnClose>
            <Form
              form={form}
              preserve={false} 
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              requiredMark={false}>
                <UserItem.UserName form={form} />
                <UserItem.Truename form={form} />
                <UserItem.PassWord form={form} isRequired={!id} />
                <UserItem.Confirm form={form} isRequired={!id} />
                <UserItem.Status form={form} />
                <UserItem.Phone form={form} />
                <UserItem.Role 
                  form={form} 
                  optionItem={getRole.value?.map((item) => ({ text: item.label, value: item.value }))} />
            </Form>
        </Modal>
)
 })

export default AddModal
