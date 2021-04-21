import React, { memo, useEffect } from 'react'
import { Layout } from 'antd'
import { useWindowSize } from 'react-use'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { AppState, updateSideBar } from '@src/store/module/app'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import './index.less'

interface IProps {
    updateSideBar: (sidebar: AppState['sidebar']) => void
    sidebar: AppState['sidebar']
}

const Header: React.FC<IProps> = memo(({ sidebar, updateSideBar }) => {
    const { width } = useWindowSize()

    useEffect(() => {
        if (width < 460) {
            updateSideBar({ ...sidebar, opened: true })
        }
    }, [width])

    const handleToggle = () => {
        updateSideBar({ ...sidebar, opened: !sidebar.opened })
    }

    return (
        <Layout.Header className='header'>
            {/* 左侧切换 */}
            {sidebar.opened
        ? <MenuUnfoldOutlined onClick={handleToggle} />
        : <MenuFoldOutlined onClick={handleToggle} />}
            {/* 右侧，如果宽度大于460或者菜单栏不展开时显示 */}
            { (sidebar.opened || width > 460) && <UserInfo /> }
        </Layout.Header>
    )
})

export default connect(() => ({}), { updateSideBar })(Header)
