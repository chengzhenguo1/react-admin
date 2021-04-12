import AuthWrapper from '@src/components/AuthWrapper'
import { Button } from 'antd'
import React, { memo } from 'react'

const Dashboard: React.FC = memo(() => (
    <div>
        <AuthWrapper roles={['admin']} component={<Button>admin权限才能看到我</Button>} />
    </div>
))

export default Dashboard
