import React, { memo } from 'react'

import { Avatar } from 'antd'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'

import './index.less'

const UserInfo: React.FC = memo(() => (
    <div className='userinfo'>
        <Avatar size={36} icon={<UserOutlined />} />
        <h3 className='name'>管理员</h3>
        <div className='close'>
            <CloseCircleOutlined />
        </div>
    </div>
))

export default UserInfo
