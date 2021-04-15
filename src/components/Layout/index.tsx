import React, { memo, useState } from 'react'

import { Layout } from 'antd'

import './index.less'
import Sider from './Sider'
import Header from './Header'
import Main from './Main'

const LayOut: React.FC = memo(({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  
  return (
      <Layout style={{ minHeight: '100vh' }}>
          {/* 侧边栏 */}
          <Sider collapsed={collapsed} />
          <Layout className='site-layout'>
              {/* 顶部 */}
              <Header toggleCollapsed={setCollapsed} collapsed={collapsed} />
              {/* 中心区域 */}
              <Main>{children}</Main>
          </Layout>
      </Layout>
  ) 
})

export default LayOut
