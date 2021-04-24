import React, { memo } from 'react'
import { useWindowSize, useDebounce } from 'react-use'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { AppState, updateSideBar } from '@src/store/module/app'
import { Min_Width } from '@src/constants/app'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import './index.less'

interface IProps {
    updateSideBar: (sidebar: AppState['sidebar']) => void
    sidebar: AppState['sidebar']
}

const Header: React.FC<IProps> = memo(({ sidebar, updateSideBar }) => {
    const { width } = useWindowSize()

    useDebounce(
        () => {
            if (width < Min_Width) {
                updateSideBar({ ...sidebar, opened: true })
            }
        },
        100,
        [width],
      )

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
