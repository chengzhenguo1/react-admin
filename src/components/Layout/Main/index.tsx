import React, { memo } from 'react'
import Breadcrumbs from '@src/components/Breadcrumbs'
import { Layout } from 'antd'
import './index.less'

const Main: React.FC = memo(({ children }) => (
    <Layout.Content className='main'>
        <Breadcrumbs />
        <div className='main-cover'>
            {children}
        </div>
    </Layout.Content>
))

export default Main
