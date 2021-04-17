import React, { memo } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Avatar, Popconfirm } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Player } from '@lottiefiles/react-lottie-player'
import { ClosePath } from '@src/constants/lottiePath'
import { logout } from '@src/store/module/user'
import './index.less'
import { IStoreState } from '@src/store/type'

interface IProps {
    logout: ()=>void
    username: string
}

const UserInfo: React.FC<IProps> = memo((props) => {
    const { replace } = useHistory()
    const logOut = () => {
        props.logout()
        replace('/')
    }
    return (
        <div className='userinfo'>
            <Avatar size={36} icon={<UserOutlined />} />
            <h3 className='name'>{props.username}</h3>
            <Popconfirm 
              placement='bottomRight'
              title='是否登出' 
              okText='确认' 
              cancelText='取消'
              onConfirm={logOut}>
                <div className='close'>
                    <Player
                      autoplay
                      loop
                      src={ClosePath}
                      style={{ height: '58px', width: '58px' }} />
                </div>
            </Popconfirm>
        </div>
)
 })

export default connect(({ user: { username } }: IStoreState) => ({ username }), {
    logout,
})(UserInfo)
