/*
Key	Required	Type	Default	Describe
name	true	String		姓名
sex	true	Boolean		性别（男：true，女：false）
face_img	false	String		头像
card_id	true	String		身份证
diploma_img	false	String		毕业证
birthday	false	String		出生年月
phone	true	String		手机号
nation	true	String		民族
political	false	String		政治面貌
school	false	String		毕业院校
education	false	String		学历
major	false	String		专业
wechat	false	String		微信号
email	false	String		个人邮箱
job_id	true	String		职位
departmen_id	true	Date		部门
job_status_date	true	String		
job_status	true	String		职位状态（在线：online，休假：vacation， 离职：quit）
company_email	true	String		公司邮箱
introduce	false	String		描述
status	true	Boolean		禁启用（启用：true，禁用：false）
job_entry_date	false	Date		入职日期
job_formal_date	false	Date		转正日期
job_quit_date	false	Date		离职日期 
*/
export interface IStaffAdd {
    name: string  
    sex: boolean 
    face_img?: string 
    card_id: string
    diploma_img?: string
    birthday?: string
    phone: string
    nation: string
    political?: string
    school?: string
    education?: string
    major?: string
    wechat?: string
    email?: string
    job_id: string
    departmen_id: Date
    job_status_date: string
    job_status: 'online' | 'vacation' | 'quit'
    company_email: string
    introduce?: string
    status: boolean
    job_entry_date?: Date
    job_formal_date?: Date
    job_quit_date?: Date
}

export interface IStaff {
    company_email: string
    full_name: string
    jobName: string
    job_entry_date: string
    job_formal_date: string
    job_quit_date: string
    name: string
    phone: string
    staff_id: string
    status: boolean
}
