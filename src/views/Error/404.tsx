import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Result } from 'antd'

const NotFount: React.FC = () => (
    <Result
      status='404'
      title='404'
      subTitle='抱歉, 您访问的页面不存在.'
      extra={<Button type='primary'><Link to='/dashboard' replace>返回主页</Link></Button>} />
)

export default NotFount
