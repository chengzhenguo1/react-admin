import React, { memo } from 'react'
import {
 Col, Input, InputProps, Row, Form, Radio, InputNumber,
} from 'antd'
import { FormInstance, FormItemProps, Rule } from 'antd/lib/form'
import Captcha from '../Captcha'
import { radioItem, TextAreaProps } from '../FormItem/type'

interface FormInputProps {
    name: string
    rules?: Rule[]
    label?: string
    formProps: FormItemProps
    inputProps: InputProps | TextAreaProps
    form: FormInstance
    radioItem?: radioItem // 单选框
    module?: 'register' | 'login'
}

const FormInput: React.FC<FormInputProps> = memo((props) => {
    console.log(props)
    return (
        <Form.Item {...props.formProps} name={props.name} rules={props.rules} label={props.label}>
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
                case 'area': 
                    return (
                        <Input.TextArea rows={('rows' in props.inputProps && props.inputProps.rows) || 10} />
                    )
                case 'radio': 
                    return (
                        <Radio.Group>
                            {props.radioItem?.map((item) => <Radio value={item.value} key={item.text}>{item.text}</Radio>)}
                        </Radio.Group>
                    )
                case 'number':
                    return (
                        <InputNumber min={props.inputProps.min} max={props.inputProps.max} />
                    )
                default:
                    return <Input {...props.inputProps} />
            }
        })()}
        </Form.Item>
)
 })

export default FormInput
