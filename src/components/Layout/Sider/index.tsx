import React, { memo } from 'react'

import { Layout } from 'antd'
import SiderMenu from '@src/components/SiderMenu'

interface IProps {
  collapsed: boolean
}

const Sider: React.FC<IProps> = memo(({ collapsed }) => (
    <Layout.Sider collapsible trigger={null} collapsed={collapsed}>
        <div className='logo' />
        {/* 菜单栏 */}
        <SiderMenu />
    </Layout.Sider>
))

export default Sider
