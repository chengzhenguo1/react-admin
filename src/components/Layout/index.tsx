import React, { memo, useEffect, useState } from 'react'
import { Layout } from 'antd'
import { useWindowSize } from 'react-use'
import Sider from './Sider'
import Header from './Header'
import Main from './Main'
import './index.less'

const LayOut: React.FC = memo(({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  
  const { width } = useWindowSize()

  useEffect(() => {
      if (width < 460) {
        setCollapsed(true)
      }
  }, [width])

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
