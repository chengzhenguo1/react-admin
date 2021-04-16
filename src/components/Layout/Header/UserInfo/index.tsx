import React, { memo } from 'react'
import { Avatar } from 'antd'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Player } from '@lottiefiles/react-lottie-player'

import './index.less'

const UserInfo: React.FC = memo(() => (
    <div className='userinfo'>
        <Avatar size={36} icon={<UserOutlined />} />
        <h3 className='name'>管理员</h3>
        <div className='close'>
            <Player
              autoplay
              loop
              src='https://assets10.lottiefiles.com/temp/lf20_1m8bBV.json'
              style={{ height: '50px', width: '50px' }} />
        </div>
    </div>
))

export default UserInfo
