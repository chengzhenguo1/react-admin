import React, { memo } from 'react'

import { Layout, Breadcrumb } from 'antd'

import './index.less'

const Main: React.FC = memo(({children}) => (
    <Layout.Content className='main'>
        {/* <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="main-cover">
            {children}
        </div>
    </Layout.Content>
))

export default Main
