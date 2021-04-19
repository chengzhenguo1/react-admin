import React, { memo, useState } from 'react'
import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'
import Main from './Main'
import './index.less'
import MainRoutes from './MainRoutes'

const LayOut: React.FC = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  return (
      <Layout style={{ minHeight: '100vh' }}>
          {/* 侧边栏 */}
          <Sider collapsed={collapsed} />
          <Layout className='site-layout'>
              {/* 顶部 */}
              <Header toggleCollapsed={setCollapsed} collapsed={collapsed} />
              {/* 中心区域 */}
              <Main>
                  <MainRoutes />
              </Main>
          </Layout>
      </Layout>
  ) 
})

export default LayOut
