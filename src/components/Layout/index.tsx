import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { IStoreState } from '@src/store/type'
import { AppState } from '@src/store/module/app'
import Sider from './Sider'
import Header from './Header'
import Main from './Main'
import MainRoutes from './MainRoutes'
import './index.less'

interface IProps {
    sidebar: AppState['sidebar']
}

const LayOut: React.FC<IProps> = memo(({ sidebar }) => (
    <Layout style={{ minHeight: '100vh' }}>
        {/* 侧边栏 */}
        <Sider collapsed={sidebar.opened} />
        <Layout className='site-layout'>
            {/* 顶部 */}
            <Header sidebar={sidebar} />
            {/* 中心区域 */}
            <Main>
                <MainRoutes />
            </Main>
        </Layout>
    </Layout>
  ))

export default connect(({ app: { sidebar } }:IStoreState) => ({ sidebar }), null)(LayOut)
