import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Image, Statistic, Space } from 'antd'
import avatarImg from '@src/assets/images/avatar.png'
import './header.less'
import { IStoreState } from '@src/store/type'
import { UserState } from '@src/store/module/user'

interface IProps {
    username?: UserState['username']
    role?: UserState['role']
}

const DashboardHeader: React.FC<IProps> = memo(({ username, role }) => (
    <div className='dashboard-header'>
        <div className='header-title'>
            控制台
        </div>
        <div className='header-content'>
            <div className='content-left'>
                <Image 
                  src={avatarImg} 
                  width={77} 
                  height={77}
                  loading='lazy'
                  preview={false} />
                <div>
                    <div className='content-info'>
                        早安，
                        {username}
                        ,祝你快乐一整天!
                    </div>
                    <div className='content-id'>
                        新建用户默认角色为admin,您当前的角色为 
                        {role}
                        。
                        测试数据需要自行添加; 
                        <p>admin角色账号aadmin@163.com, aadmin</p>
                        <p>user角色账号user@163.com, ausers</p>
                    </div>
                </div>
            </div>
            <Space className='content-count' size='large'>
                <Statistic title='接触前端' value={1} />
                <Statistic title='项目数' value={8} />
                <Statistic title='项目访问' value={2223} />
            </Space>
        </div>
    </div>
))

export default connect(({ user: { username, role } }: IStoreState) => ({ username, role }), null)(DashboardHeader)
