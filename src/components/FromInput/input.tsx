import React, { memo, useCallback } from 'react'
import {
 Col, Input, Row, Form, Radio, InputNumber, Select, DatePicker, Upload,
} from 'antd'
import { FormInstance, FormItemProps } from 'antd/lib/form'
import { SelectValue } from 'antd/lib/select'
import Captcha from '../Captcha'
import { ItemConfig } from '../FormItem/type'
import UpLoadPic from '../UploadPic'

export interface FormInputProps extends ItemConfig {
    formProps: FormItemProps
    form: FormInstance
    onSelect?: (value: SelectValue)=> void
}

const FormInput: React.FC<FormInputProps> = memo((props) => {
    const onHandleSelect = useCallback((value: SelectValue) => {
        if (props.onSelect) {
            props?.onSelect(value)
        }
    }, [])

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
                case 'textArea': 
                    return (
                        <Input.TextArea rows={props?.rows || 10} />
                    )
                case 'radio': 
                    return (
                        <Radio.Group>
                            {props.radioItem?.map((item) => <Radio value={item.value} key={item.text}>{item.text}</Radio>)}
                        </Radio.Group>
                    )
                case 'number':
                    return (
                        <InputNumber min={props.inputProps.type} max={props.inputProps.max} />
                    )
                case 'select':
                    return (
                        <Select
                          placeholder={props.inputProps?.placeholder || '请选择'}
                          onChange={onHandleSelect} 
                          style={{ width: props.width || 90 }}
                          loading={props?.loading}>
                            {props.optionItem?.map((item) => (
                                <Select.Option value={item.value} key={item.value}>{item.text}</Select.Option>
                            ))}
                        </Select>
                    )
                case 'month': 
                    return (
                        <DatePicker 
                          placeholder={props.inputProps.placeholder} 
                          picker={props.picker || 'date'} 
                          format={props.format || 'YYYY/MM/DD'} />
                    )
                case 'file': 
                    return (
                        <UpLoadPic />
                    )
                default:
                    return <Input {...props.inputProps} />
            }
        })()}
        </Form.Item>
)
 })

export default FormInput
