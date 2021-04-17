import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Player } from '@lottiefiles/react-lottie-player'
import { ClosePath } from '@src/constants/lottiePath'
import { UserState, logout } from '@src/store/module/user'
import './index.less'
import { IStoreState } from '@src/store/type'

interface IProps {
    logout: ()=>void
    username: string
}

const UserInfo: React.FC<IProps> = memo((props) => (
    <div className='userinfo'>
        <Avatar size={36} icon={<UserOutlined />} />
        <h3 className='name'>{props.username}</h3>
        <div className='close'>
            <Player
              autoplay
              loop
              src={ClosePath}
              style={{ height: '58px', width: '58px' }} />
        </div>
    </div>
))

export default connect(({ user: { username } }: IStoreState) => ({ username }), {
    logout,
})(UserInfo)
