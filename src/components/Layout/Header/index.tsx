import React, { memo } from 'react'

import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined  } from '@ant-design/icons'

import './index.less'
import UserInfo from './UserInfo'

interface IProps {
    toggleCollapsed: (flag: boolean)=>void
    collapsed: boolean
}

const Header: React.FC<IProps> = memo(({ toggleCollapsed, collapsed }) => {
    
    const handleToggle = ()=>{
        toggleCollapsed(!collapsed)
    }

    return(
    <Layout.Header className='header'>
        {/* 左侧切换 */}
        {collapsed ?
        <MenuUnfoldOutlined onClick={handleToggle} /> :
        <MenuFoldOutlined onClick={handleToggle} />
        }
        {/* 右侧 */}
        <UserInfo />
    </Layout.Header>
    )
})

export default Header
