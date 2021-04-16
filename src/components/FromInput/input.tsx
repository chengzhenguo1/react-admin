import React, { memo } from 'react'
import {
 Col, Input, InputProps, Row, Form,
} from 'antd'
import { FormInstance, FormItemProps, Rule } from 'antd/lib/form'
import Captcha from '../Captcha'

interface FormInputProps {
    name: string
    rules: Rule[]
    formProps: FormItemProps
    inputProps: InputProps & { visibilityToggle?: boolean }
    form: FormInstance
    module?: 'register' | 'login'
}

const FormInput: React.FC<FormInputProps> = memo((props) => {
    console.log(props)
    return (
        <Form.Item {...props.formProps} name={props.name} rules={props.rules}>
            {(() => {
            switch (props.inputProps.type) {
                case 'password':
                    return <Input.Password {...props.inputProps} />
                case 'code':
                    return (
                        <Row gutter={12}>
                            <Col span='15'>
                                <Input {...props.inputProps} />
                            </Col>
                            <Col span='9'>
                                <Captcha module={props.module || 'login'} form={props.form} />
                            </Col>
                        </Row>
                    )
                default:
                    return <Input {...props.inputProps} />
            }
        })()}
        </Form.Item>
)
 })

export default FormInput
