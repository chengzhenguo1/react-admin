import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Image, Statistic, Space } from 'antd'
import avatarImg from '@src/assets/images/avatar.png'
import './header.less'
import { IStoreState } from '@src/store/type'
import { UserState } from '@src/store/module/user'

interface IProps {
    username?: UserState['username']
}

const DashboardHeader: React.FC<IProps> = memo(({ username }) => (
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
                        前端萌新 | 邯郸学院 — 软件工程专业 — 某某年级
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

export default connect(({ user: { username } }: IStoreState) => ({ username }), null)(DashboardHeader)
