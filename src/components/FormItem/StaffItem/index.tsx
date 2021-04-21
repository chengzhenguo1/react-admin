import React, { memo } from 'react'
import { FormItemProps } from 'antd'
import FormInput from '../../FromInput/input'
import { ItemProps } from '../type'
import { config, StaffItemType } from './config'

export const formProps: FormItemProps = {
    hasFeedback: true,
    children: null,
}

function Name(props: ItemProps) {
    return (
        <FormInput
          formProps={formProps}
          {...config.Name}
          {...props} />
)
}

function Sex(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Sex}
          {...props} />
)
}

function FaceImg(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.FaceImg}
          {...props} />
)
}

function CardId(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.CardId}
          {...props} />
)
}

function DiplomaImg(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.DiplomaImg}
          {...props} />
)
}

function Birthday(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Birthday}
          {...props} />
)
}

function Phone(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Phone}
          {...props} />
)
}

function Nation(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Nation}
          {...props} />
)
}

function Political(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Political}
          {...props} />
)
}

function School(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.School}
          {...props} />
)
}

function Education(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Education}
          {...props} />
)
}

function Major(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Major}
          {...props} />
)
}

function Wechat(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Wechat}
          {...props} />
)
}

function Email(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Email}
          {...props} />
)
}

function JobId(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.JobId}
          {...props} />
)
}

function DepartmenId(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.DepartmenId}
          {...props} />
)
}

function JobStatusDate(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.JobStatusDate}
          {...props} />
)
}

function JobStatus(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.JobStatus}
          {...props} />
)
}

function CompanyEmail(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.CompanyEmail}
          {...props} />
)
}

function Introduce(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Introduce}
          {...props} />
)
}

function Status(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.Status}
          {...props} />
)
}

function JobEntryDate(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.JobEntryDate}
          {...props} />
)
}

function JobFormalDate(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.JobFormalDate}
          {...props} />
)
}

function JobQuitDate(props: ItemProps) {
    return (
        <FormInput
          formProps={{ children: null }}
          {...config.JobQuitDate}
          {...props} />
)
}

const StaffItem: StaffItemType = {
    Name: memo(Name),
    Sex: memo(Sex),
    FaceImg: memo(FaceImg),
    CardId: memo(CardId),
    DiplomaImg: memo(DiplomaImg),
    Birthday: memo(Birthday),
    Phone: memo(Phone),
    Nation: memo(Nation),
    Political: memo(Political),
    School: memo(School),
    Education: memo(Education),
    Major: memo(Major),
    Wechat: memo(Wechat),
    Email: memo(Email),
    JobId: memo(JobId),
    DepartmenId: memo(DepartmenId),
    JobStatusDate: memo(JobStatusDate),
    JobStatus: memo(JobStatus),
    CompanyEmail: memo(CompanyEmail),
    Introduce: memo(Introduce),
    Status: memo(Status),
    JobEntryDate: memo(JobEntryDate),
    JobFormalDate: memo(JobFormalDate),
    JobQuitDate: memo(JobQuitDate),
}

export default StaffItem
