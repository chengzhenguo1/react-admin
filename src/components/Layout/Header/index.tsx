import React, { memo, useEffect } from 'react'
import { Layout } from 'antd'
import { useWindowSize } from 'react-use'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import UserInfo from './UserInfo'
import './index.less'

interface IProps {
    toggleCollapsed: (flag: boolean)=>void
    collapsed: boolean
}

const Header: React.FC<IProps> = memo(({ toggleCollapsed, collapsed }) => {
    const { width } = useWindowSize()

    useEffect(() => {
        if (width < 460) {
            toggleCollapsed(true)
        }
    }, [width])

    const handleToggle = () => {
        toggleCollapsed(!collapsed)
    }

    return (
        <Layout.Header className='header'>
            {/* 左侧切换 */}
            {collapsed
        ? <MenuUnfoldOutlined onClick={handleToggle} />
        : <MenuFoldOutlined onClick={handleToggle} />}
            {/* 右侧，如果宽度大于460或者菜单栏不展开时显示 */}
            { (collapsed || width > 460) && <UserInfo /> }
        </Layout.Header>
    )
})

export default Header
