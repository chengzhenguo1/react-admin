import React, { memo, useCallback } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Avatar, Popconfirm } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Player } from '@lottiefiles/react-lottie-player'
import { ClosePath } from '@src/constants/lottiePath'
import { logout, UserState } from '@src/store/module/user'
import { clearSideBarRoutes } from '@src/store/module/app'
import { IStoreState } from '@src/store/type'
import './index.less'

interface IProps {
    logout: () => void
    clearSideBarRoutes: () => void
    username: UserState['username']
}

const UserInfo: React.FC<IProps> = memo((props) => {
    const { replace } = useHistory()

    const logOut = useCallback(() => {
        props.logout()
        props.clearSideBarRoutes()
        replace('/system/login')
    }, [])
    
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
    logout, clearSideBarRoutes,
})(UserInfo)
